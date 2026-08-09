create table if not exists public.messages (
  id text primary key,
  author varchar(24) not null check (char_length(author) between 1 and 12),
  content varchar(400) not null check (char_length(content) between 1 and 200),
  created_at timestamptz not null default now(),
  position_x real not null check (position_x between 0 and 100),
  position_y real not null check (position_y between 0 and 100),
  rotation real not null default 0,
  scale real not null default 1,
  status text not null default 'pending' check (status in ('pending','approved','rejected'))
);
alter table public.messages enable row level security;

grant usage on schema public to anon;
grant select, insert on public.messages to anon;

drop policy if exists "public reads approved messages" on public.messages;
drop policy if exists "public submits pending messages" on public.messages;

create policy "public reads approved messages" on public.messages
  for select
  to anon
  using (status='approved');

create policy "public submits pending messages" on public.messages
  for insert
  to anon
  with check (status='pending');
create index if not exists messages_status_created_at_idx on public.messages(status,created_at desc);

-- 首次执行时清理历史数据，只保留最新 100 条。
delete from public.messages
where id in (
  select id from public.messages
  order by created_at desc
  offset 100
);

-- 此后每次新增留言都自动清理，避免表无限增长。
create or replace function public.keep_latest_100_messages()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  delete from public.messages
  where id in (
    select id from public.messages
    order by created_at desc
    offset 100
  );
  return new;
end;
$$;

drop trigger if exists trim_messages_after_insert on public.messages;
create trigger trim_messages_after_insert
after insert on public.messages
for each statement execute function public.keep_latest_100_messages();

-- 自动审核：默认通过正常文本，拦截明显链接/邮箱/重复字符刷屏。
create or replace function public.auto_moderate_message()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if btrim(coalesce(new.author, '')) = '' or btrim(coalesce(new.content, '')) = '' then
    update public.messages set status = 'rejected' where id = new.id;
    return new;
  end if;

  if new.content ~* '(https?://|www\.|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})' or new.content ~ '(.)\1{9,}' then
    update public.messages set status = 'rejected' where id = new.id;
  else
    update public.messages set status = 'approved' where id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists auto_moderate_message_after_insert on public.messages;
create trigger auto_moderate_message_after_insert
after insert on public.messages
for each row execute function public.auto_moderate_message();
