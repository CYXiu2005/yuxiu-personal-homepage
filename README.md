# personal-website

这是一个基于 Astro、TypeScript、Tailwind CSS 4 和 Content Collections 的个人网页基础框架。
直接访问地址：https://yuxiu-home-d9gh6zligfec90feb-1465488747.tcloudbaseapp.com
            yuxiu-home.vercel.app（海外）

## 开发

```bash
npm install
npm run dev
```

## 上线配置

留言板需要在部署平台配置这两个公开环境变量：

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

它们都可以在创建 Supabase 项目后立即从控制台拿到，不需要等网站先部署成功。
Vercel 也可以在导入项目后直接先把环境变量填好，再触发首次部署。

## 构建

```bash
npm run build
```

## 目录概览

- `src/pages/`：路由页面
- `src/layouts/`：页面布局
- `src/components/`：可复用组件
- `src/content/`：内容集合
- `src/data/`：站点配置数据
- `src/styles/`：全局样式
