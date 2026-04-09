'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  company: string;
  address: string;
  fallbackUrl?: string;
  className?: string;
};

declare global {
  interface Window {
    AMap?: {
      Map: new (container: HTMLElement, options: Record<string, unknown>) => {
        destroy: () => void;
        add: (obj: unknown) => void;
        setFitView?: () => void;
      };
      Marker: new (options: Record<string, unknown>) => unknown;
      Geocoder: new (options: Record<string, unknown>) => {
        getLocation: (
          keyword: string,
          cb: (status: string, result: { geocodes?: { location?: { lng: number; lat: number } }[] }) => void
        ) => void;
      };
      plugin: (plugins: string[], cb: () => void) => void;
    };
    __amapScriptLoading?: Promise<void>;
  }
}

function loadAmapScript(key: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.AMap) return Promise.resolve();
  if (window.__amapScriptLoading) return window.__amapScriptLoading;

  window.__amapScriptLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-amap-sdk="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('AMap SDK load failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
    script.async = true;
    script.defer = true;
    script.dataset.amapSdk = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('AMap SDK load failed'));
    document.head.appendChild(script);
  });

  return window.__amapScriptLoading;
}

export default function AmapOfficeMap({ company, address, fallbackUrl, className }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const mapKey = process.env.NEXT_PUBLIC_AMAP_KEY?.trim() ?? '';
  const geocodeText = useMemo(() => `${company} ${address}`.trim(), [company, address]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapKey) {
      setLoadError('未设置 NEXT_PUBLIC_AMAP_KEY');
      return;
    }

    let disposed = false;
    let mapInstance: { destroy: () => void } | null = null;

    const init = async () => {
      try {
        await loadAmapScript(mapKey);
        if (disposed || !mapRef.current || !window.AMap) return;

        const map = new window.AMap.Map(mapRef.current, {
          zoom: 14,
          center: [114.1694, 22.3193], // default center until geocoding result returns
          viewMode: '2D',
        });
        mapInstance = map;

        window.AMap.plugin(['AMap.Geocoder'], () => {
          if (disposed || !window.AMap) return;
          const geocoder = new window.AMap.Geocoder({ city: '全国' });
          geocoder.getLocation(geocodeText, (status, result) => {
            if (disposed || !window.AMap) return;
            const loc = result?.geocodes?.[0]?.location;
            if (status === 'complete' && loc) {
              const marker = new window.AMap!.Marker({
                position: [loc.lng, loc.lat],
                title: company,
              });
              map.add(marker);
              if (map.setFitView) map.setFitView();
              return;
            }
            setLoadError('地址解析失败');
          });
        });
      } catch {
        if (!disposed) setLoadError('高德地图加载失败');
      }
    };

    init();

    return () => {
      disposed = true;
      if (mapInstance) mapInstance.destroy();
    };
  }, [company, geocodeText, mapKey]);

  if (loadError) {
    return (
      <div className={className}>
        <div className="flex h-full min-h-[280px] w-full items-center justify-center p-6 text-center text-sm text-slate-600 lg:min-h-[360px]">
          <div>
            <p>地图暂时无法加载（{loadError}）。</p>
            {fallbackUrl ? (
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-medium text-brand-primary hover:underline"
              >
                打开备用地图链接
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="h-full min-h-[280px] w-full lg:min-h-[360px]" />
    </div>
  );
}
