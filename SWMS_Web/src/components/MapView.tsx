'use client';

import { useEffect, useRef, useState } from 'react';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  category: string;
  status: string;
  description: string;
}

export default function MapView({ markers }: { markers: MarkerData[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current!).setView([28.6139, 77.2090], 12); // Default: New Delhi

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      const statusColors: Record<string, string> = {
        PENDING: '#f59e0b',
        ASSIGNED: '#a855f7',
        IN_PROGRESS: '#3b82f6',
        RESOLVED: '#10b981',
      };

      markers.forEach((m) => {
        const color = statusColors[m.status] || '#94a3b8';
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        L.marker([m.lat, m.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:Inter,sans-serif;min-width:180px;">
              <strong style="color:#1e293b;">${m.category}</strong><br/>
              <span style="color:#64748b;font-size:12px;">${m.description.slice(0, 80)}...</span><br/>
              <span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600;color:white;background:${color};">${m.status}</span>
            </div>
          `);
      });

      mapInstanceRef.current = map;

      // Fit bounds if there are markers
      if (markers.length > 0) {
        const group = L.featureGroup(
          markers.map((m) => L.marker([m.lat, m.lng]))
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mounted, markers]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-900/50 rounded-2xl flex items-center justify-center">
        <p className="text-slate-400">Loading map...</p>
      </div>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div ref={mapRef} className="w-full h-full rounded-2xl z-0" />
    </>
  );
}
