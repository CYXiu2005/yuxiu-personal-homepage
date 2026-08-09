import { useCallback, useEffect, useRef, useState } from 'react';
import {
  siAstro,
  siFigma,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siPython,
  siReact,
  siSass,
  siSharp,
  siTypescript,
  siUnity,
} from 'simple-icons';
import './SkillFan.css';

const DEFAULT_SKILLS = [
  'Python', 'SQL', 'JavaScript', 'TypeScript', 'React', 'HTML', 'CSS / Sass',
  'Unity', 'C#', 'Git / GitHub', 'Astro', 'Taro', 'Figma'
];

const SKILL_ICONS = {
  Python: siPython,
  SQL: siMysql,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  HTML: siHtml5,
  'CSS / Sass': siSass,
  Unity: siUnity,
  'C#': siSharp,
  'Git / GitHub': siGithub,
  Astro: siAstro,
  Figma: siFigma,
};

const getSkillPosition = (index, length, current = 0) => {
  const radius = 355;
  const angleStep = 9.3 * Math.PI / 180;
  let distance = index - current;
  distance = ((distance % length) + length) % length;
  if (distance > length / 2) distance -= length;
  const angle = Math.max(-1.16, Math.min(1.16, distance * angleStep));
  const x = -radius * (1 - Math.cos(angle));
  const y = radius * Math.sin(angle);
  const strength = Math.max(0.08, 1 - Math.abs(distance) * 0.14);

  return {
    transform: `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${(angle * 180 / Math.PI).toFixed(2)}deg)`,
    opacity: strength,
    filter: `blur(${Math.max(0, Math.abs(distance) - 2) * 0.22}px)`,
    zIndex: Math.max(1, 100 - Math.round(Math.abs(distance) * 10)),
    pointerEvents: Math.abs(distance) <= 5 ? 'auto' : 'none',
    '--skill-active': Math.max(0, 1 - Math.abs(distance)),
  };
};

export default function SkillFan({ items = DEFAULT_SKILLS }) {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef();
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const [selected, setSelected] = useState(0);
  const [dragging, setDragging] = useState(false);
  const isCompactLayout = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches;

  const render = useCallback(() => {
    currentRef.current += (targetRef.current - currentRef.current) * 0.14;
    if (Math.abs(targetRef.current - currentRef.current) < 0.001) currentRef.current = targetRef.current;

    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const style = getSkillPosition(index, items.length, currentRef.current);
      element.style.transform = style.transform;
      element.style.opacity = String(style.opacity);
      element.style.filter = style.filter;
      element.style.zIndex = String(style.zIndex);
      element.style.pointerEvents = style.pointerEvents;
      element.style.setProperty('--skill-active', String(style['--skill-active']));
    });

    if (currentRef.current !== targetRef.current) frameRef.current = requestAnimationFrame(render);
    else frameRef.current = undefined;
  }, [items.length]);

  const moveTo = useCallback((value) => {
    targetRef.current = value;
    const nextSelected = ((Math.round(value) % items.length) + items.length) % items.length;
    setSelected(nextSelected);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(render);
  }, [items.length, render]);

  useEffect(() => {
    moveTo(targetRef.current);
    const root = rootRef.current;
    if (!root) return undefined;
    let wheelTimer;
    const wheel = (event) => {
      if (isCompactLayout()) return;
      event.preventDefault();
      moveTo(targetRef.current + Math.sign(event.deltaY) * 0.72);
      clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => moveTo(Math.round(targetRef.current)), 120);
    };
    root.addEventListener('wheel', wheel, { passive: false });
    return () => {
      root.removeEventListener('wheel', wheel);
      clearTimeout(wheelTimer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [moveTo]);

  const pointerDown = (event) => {
    if (isCompactLayout()) return;
    dragRef.current = { y: event.clientY, start: targetRef.current, id: event.pointerId };
    dragMovedRef.current = false;
    setDragging(true);
  };
  const pointerMove = (event) => {
    if (!dragRef.current) return;
    const delta = event.clientY - dragRef.current.y;
    if (Math.abs(delta) > 4 && !dragMovedRef.current) {
      dragMovedRef.current = true;
      rootRef.current?.setPointerCapture(dragRef.current.id);
    }
    if (dragMovedRef.current) moveTo(dragRef.current.start - delta / 34);
  };
  const pointerEnd = () => {
    if (!dragRef.current) return;
    if (rootRef.current?.hasPointerCapture(dragRef.current.id)) {
      rootRef.current.releasePointerCapture(dragRef.current.id);
    }
    dragRef.current = null;
    setDragging(false);
    moveTo(Math.round(targetRef.current));
  };
  const keyDown = (event) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    moveTo(Math.round(targetRef.current) + (event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1));
  };

  return (
    <aside className="skill-fan-shell" aria-label="技能展示">
      <span className="skill-fan-shell__title" aria-hidden="true">技能</span>
      <div
        ref={rootRef}
        className={`skill-fan${dragging ? ' skill-fan--dragging' : ''}`}
        role="listbox"
        tabIndex={0}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerEnd}
        onPointerCancel={pointerEnd}
        onKeyDown={keyDown}
      >
        {items.map((item, index) => {
          const icon = SKILL_ICONS[item];
          return (
            <button
              key={item}
              ref={(node) => { itemRefs.current[index] = node; }}
              className={`skill-fan__item${selected === index ? ' skill-fan__item--selected' : ''}`}
              type="button"
              role="option"
              aria-selected={selected === index}
              style={getSkillPosition(index, items.length)}
              onClick={() => {
                if (dragMovedRef.current) return;
                const rounded = Math.round(targetRef.current);
                const currentIndex = ((rounded % items.length) + items.length) % items.length;
                let delta = index - currentIndex;
                if (delta > items.length / 2) delta -= items.length;
                if (delta < -items.length / 2) delta += items.length;
                moveTo(rounded + delta);
              }}
            >
              <span className="skill-fan__icon" aria-hidden="true">
                {icon ? (
                  <svg viewBox="0 0 24 24" focusable="false"><path d={icon.path} /></svg>
                ) : (
                  <span className="skill-fan__taro-mark">👽</span>
                )}
              </span>
              <span>{item}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
