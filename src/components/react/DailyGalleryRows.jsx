import { useMemo } from 'react';
import AccordionGallery from './AccordionGallery.jsx';

/**
 * @typedef {{ image: string, width: number, height: number, label: string, alt?: string }} GalleryItem
 */

const sample = (items, count) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

/**
 * @param {{ portraits?: GalleryItem[], others?: GalleryItem[] }} props
 */
export default function DailyGalleryRows({ portraits = [], others = [] }) {
  const portraitSelection = useMemo(() => sample(portraits, 6), [portraits]);
  const otherSelection = useMemo(() => sample(others, 5), [others]);

  return (
    <div className="daily-gallery-rows">
      <AccordionGallery items={otherSelection} defaultIndex={2} height={278} expandRatio={.46} radius={15} imageFit="contain" />
      <AccordionGallery items={portraitSelection} defaultIndex={2} height={352} expandRatio={.46} radius={15} imageFit="contain" />
    </div>
  );
}
