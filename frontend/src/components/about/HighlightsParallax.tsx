'use client';
import { useEffect, useRef, useState } from 'react';

export default function HighlightsParallax() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [textOffset, setTextOffset] = useState(0);

  useEffect(() => {
    const updateParallax = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const distanceFromCenter = rect.top + rect.height * 0.5 - viewportCenter;

      // Keep background fixed; only move text for overlay scroll effect.
      setTextOffset(distanceFromCenter * -0.06);
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[300px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/about/geometric-building2.jpg')",
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="absolute inset-0 bg-blue-900/15" />

      <div
        className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
        style={{ transform: `translateY(${textOffset}px)` }}
      >
        <div className="grid w-full max-w-4xl grid-cols-3 gap-4 text-white">
          <div className="text-center">
            <p className="text-5xl font-extrabold leading-none">300</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.08em]">BROKERS SERVING</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold leading-none">228</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.08em]">EMPLOYEES</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold leading-none">6</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.08em]">DEVELOPMENT CENTERS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
