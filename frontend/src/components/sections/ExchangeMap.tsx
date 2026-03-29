'use client';

import { useState } from 'react';

interface Exchange {
  id: string;
  name: string;
  country: string;
  flagCode: string;
  x: number; // left %  (lon+180)/360*100
  y: number; // top  %  (90-lat)/180*100
}

/* Geographic positions on equirectangular projection */
const EXCHANGES: Exchange[] = [
  { id: 'nyse',      name: 'NYSE',          country: 'USA',          flagCode: 'us', x: 29.0, y: 28.0 },
  { id: 'nasdaq',    name: 'NASDAQ',        country: 'USA',          flagCode: 'us', x: 16.1, y: 29.6 },
  { id: 'sse',       name: 'SSE',           country: 'China',        flagCode: 'cn', x: 83.8, y: 32.7 },
  { id: 'hkex',      name: 'HKEX',          country: 'Hong Kong',    flagCode: 'hk', x: 81.7, y: 38.2 },
  { id: 'japannext', name: 'Japannext',     country: 'Japan',        flagCode: 'jp', x: 88.5, y: 30.1 },
  { id: 'set',       name: 'SET',           country: 'Thailand',     flagCode: 'th', x: 77.5, y: 45.8 },
  { id: 'sgx',       name: 'SGX',           country: 'Singapore',    flagCode: 'sg', x: 79.2, y: 50.0 },
  { id: 'bursa',     name: 'Bursa Malaysia',country: 'Malaysia',     flagCode: 'my', x: 78.2, y: 49.3 },
  { id: 'pse',       name: 'PSE',           country: 'Philippines',  flagCode: 'ph', x: 84.8, y: 45.6 },
];

export default function ExchangeMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[#001030] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            ASIA&apos;S LARGEST CAPITAL MARKET<br className="hidden sm:block" /> SOLUTIONS PROVIDER
          </h2>
          <p className="mt-3 text-blue-300/70 text-sm">
            Serving every broker to serve traders all around the world
          </p>
        </div>

        {/* Map container */}
        <div
          className="relative w-full overflow-hidden rounded-xl border border-white/5"
          style={{ aspectRatio: '2.1 / 1', minHeight: 280 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#001440]" />

          {/* Grid lines (graticule) */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(100,160,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-blue-600/5 blur-3xl" />

          {/* Simplified continent shapes */}
          <svg
            viewBox="0 0 700 200"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Draw simple continent shapes */}
            {/* North America */}
            <polygon points="60,40 120,30 140,50 130,80 110,90 80,85 55,65" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* South America */}
            <polygon points="110,95 140,88 148,110 145,140 130,155 112,150 100,130 100,110" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Europe */}
            <polygon points="270,25 310,20 325,35 320,55 295,60 270,55 260,40" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Africa */}
            <polygon points="275,60 320,55 335,75 330,120 305,140 280,135 262,110 260,80" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Asia (main) */}
            <polygon points="320,20 450,15 500,25 520,50 510,75 480,85 440,88 400,80 370,65 340,55 318,40" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* SE Asia */}
            <polygon points="440,88 475,85 490,100 480,118 460,120 440,108 435,95" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Japan */}
            <polygon points="510,45 525,40 530,52 520,58 510,55" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Australia */}
            <polygon points="480,120 540,115 555,130 550,155 520,162 490,155 475,140" fill="rgba(100,150,220,0.12)" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" />
            {/* Connection lines from Asia hub */}
            <line x1="472" y1="90" x2="164" y2="56" stroke="#0ea5e9" strokeWidth="0.4" strokeDasharray="6,6" opacity="0.3" />
            <line x1="472" y1="90" x2="105" y2="52" stroke="#0ea5e9" strokeWidth="0.4" strokeDasharray="6,6" opacity="0.3" />
          </svg>

          {/* Exchange dots */}
          {EXCHANGES.map((ex) => {
            const isActive = active === ex.id;
            // Flip tooltip to left side if dot is on the right portion of the map
            const tooltipLeft = ex.x < 60;

            return (
              <div
                key={ex.id}
                className="absolute"
                style={{
                  left: `${ex.x}%`,
                  top: `${ex.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActive ? 30 : 10,
                }}
                onMouseEnter={() => setActive(ex.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Outer pulse ring */}
                <span
                  className="absolute rounded-full animate-ping"
                  style={{
                    width: 20,
                    height: 20,
                    top: -6,
                    left: -6,
                    backgroundColor: 'rgba(14,165,233,0.35)',
                    animationDuration: '2s',
                  }}
                />

                {/* Dot */}
                <span
                  className="relative block rounded-full border-2 border-white cursor-pointer transition-transform duration-200"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: isActive ? '#ffffff' : '#0ea5e9',
                    transform: isActive ? 'scale(1.6)' : 'scale(1)',
                    boxShadow: isActive ? '0 0 12px rgba(255,255,255,0.8)' : '0 0 6px rgba(14,165,233,0.6)',
                  }}
                />

                {/* Tooltip */}
                {isActive && (
                  <div
                    className={`absolute bottom-full mb-3 bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100 text-center`}
                    style={{
                      width: 90,
                      [tooltipLeft ? 'left' : 'right']: tooltipLeft ? '50%' : '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 40,
                    }}
                  >
                    {/* Flag image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w80/${ex.flagCode}.png`}
                      alt={ex.country}
                      className="w-full"
                      style={{ height: 42, objectFit: 'cover' }}
                    />
                    <div className="px-2 py-1.5">
                      <p className="text-[11px] font-black text-[#003366] leading-tight">{ex.name}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{ex.country}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 opacity-60">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9] inline-block" />
            <span className="text-[10px] text-blue-300 tracking-wider">CONNECTED EXCHANGES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
