import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Place } from '../types/types.ts';

export default function MapView({ places }: { places: Place[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // 🗺 создаём карту 1 раз
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([48.8566, 2.3522], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // 📍 обновляем маркеры при изменении places
  useEffect(() => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;

    // ❌ удаляем старые маркеры
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // ✅ добавляем новые
    places.forEach((place) => {
      const marker = L.marker([place.lat, place.lng]).addTo(map).bindPopup(place.name);

      markersRef.current.push(marker);
    });

    // 🎯 центрируем на последнем добавленном месте
    if (places.length > 0) {
      const last = places[places.length - 1];
      map.setView([last.lat, last.lng], 13);
    }
  }, [places]);

  return (
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}
