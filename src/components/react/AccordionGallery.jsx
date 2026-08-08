import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './AccordionGallery.css';

/**
 * @typedef {{ image: string, width?: number, height?: number, label?: string, alt?: string }} AccordionItem
 */

/**
 * @param {{
 *   items?: AccordionItem[], defaultIndex?: number, accentColor?: string,
 *   overlayColor?: string, textColor?: string, height?: number, gap?: number,
 *   radius?: number, expandRatio?: number, duration?: number, ease?: string,
 *   parallax?: number, tilt?: number, stagger?: number, trigger?: string,
 *   showLabels?: boolean, grayscale?: boolean, imageFit?: string,
 *   className?: string
 * }} props
 */
export default function AccordionGallery({
  items = [], defaultIndex = 2, accentColor = '#fff8ef', overlayColor = '#302820',
  textColor = '#fffaf4', height = 260, gap = 10, radius = 14, expandRatio = .46,
  duration = .62, ease = 'power3.out', parallax = .5, tilt = 6, stagger = .06,
  trigger = 'hover', showLabels = true, grayscale = true, imageFit = 'cover', className = ''
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]); const mediaRefs = useRef([]);
  const barRefs = useRef([]); const textRefs = useRef([]);
  const tlRef = useRef(null); const firstRunRef = useRef(true); const mediaSizeRef = useRef(320);
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const applyLayout = useCallback((animate) => {
    if (!panelRefs.current.length) return;
    const r = Math.min(Math.max(expandRatio, .2), .9);
    const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
    tlRef.current?.kill();
    const dur = animate && !prefersReduced ? duration : 0;
    const tl = gsap.timeline();
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const isActive = i === active;
      const rot = isActive ? 0 : i < active ? tilt : -tilt;
      tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, duration: dur, ease }, 0);
      const media = mediaRefs.current[i];
      if (media) {
        const shift = Math.max(-1.5, Math.min(1.5, active - i)) * parallax * mediaSizeRef.current * .06;
        tl.to(media, { xPercent: -50, yPercent: -50, x: isActive ? 0 : shift,
          '--ag-gray': grayscale ? (isActive ? 0 : 1) : 0, '--ag-dim': isActive ? 0 : .3,
          duration: dur, ease }, 0);
      }
      const labels = [barRefs.current[i], textRefs.current[i]].filter(Boolean);
      if (showLabels && labels.length) tl.to(labels, { opacity: isActive ? 1 : 0, x: isActive ? 0 : -14,
        duration: isActive ? dur : dur * .6, ease, stagger: isActive && !prefersReduced ? stagger : 0 }, 0);
    });
    tlRef.current = tl;
  }, [active, count, duration, ease, expandRatio, grayscale, parallax, prefersReduced, showLabels, stagger, tilt]);

  useEffect(() => {
    const el = rootRef.current; if (!el) return undefined;
    const measure = () => {
      const usable = Math.max(el.getBoundingClientRect().width - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, .2), .9) * 1.22);
      mediaSizeRef.current = size; el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };
    measure(); const ro = new ResizeObserver(measure); ro.observe(el); return () => ro.disconnect();
  }, [applyLayout, count, expandRatio, gap]);
  useEffect(() => { applyLayout(!firstRunRef.current); firstRunRef.current = false; }, [applyLayout]);
  useEffect(() => () => tlRef.current?.kill(), []);

  return <div ref={rootRef} className={`accordion-gallery${imageFit === 'contain' ? ' accordion-gallery--contain' : ''}${className ? ` ${className}` : ''}`}
    style={{ '--ag-accent': accentColor, '--ag-overlay': overlayColor, '--ag-text': textColor,
      '--ag-gap': `${gap}px`, '--ag-radius': `${radius}px`, height: `${height}px` }} role="list" aria-label="日常照片画廊">
    {items.map((item, i) => <button key={`${item.image}-${i}`} ref={(el) => { panelRefs.current[i] = el; }}
      className={`ag-panel${active === i ? ' ag-panel--active' : ''}`} type="button" role="listitem"
      aria-current={active === i ? 'true' : undefined} aria-label={item.label}
      onMouseEnter={() => trigger === 'hover' && setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
      onKeyDown={(e) => { if (['ArrowRight','ArrowDown'].includes(e.key)) { e.preventDefault(); setActive((i + 1) % count); }
        if (['ArrowLeft','ArrowUp'].includes(e.key)) { e.preventDefault(); setActive((i - 1 + count) % count); } }}>
      <span className="ag-panel__frame"><span className="ag-panel__media" ref={(el) => { mediaRefs.current[i] = el; }}>
        <img src={item.image} alt={item.alt || item.label || ''} draggable="false" /></span><span className="ag-panel__overlay" /></span>
      {showLabels && <span className="ag-panel__label" aria-hidden="true"><span className="ag-panel__bar" ref={(el) => { barRefs.current[i] = el; }} />
        <span className="ag-panel__text" ref={(el) => { textRefs.current[i] = el; }}>{item.label}</span></span>}
    </button>)}
  </div>;
}
