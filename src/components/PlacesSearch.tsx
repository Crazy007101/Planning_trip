import { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

import { geocodeCity } from '../api/nominatim';
import { fetchAttractionsByCity, fetchAttractionsByName } from '../api/overpass';
import { useDebounce } from '../hooks/useDebounce';
import type { ApiPlace } from '../types/types.ts';
import { getCache, setCache } from '../utilis/cache.ts';

export default function PlacesSearch({ onSelect }: { onSelect: (place: ApiPlace) => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState<ApiPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [cityCoords, setCityCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // 🔥 УНИВЕРСАЛЬНЫЙ ПОИСК
  const runSearch = async (value: string) => {
    if (value.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }

    const cacheKey = value.toLowerCase();

    // 🔥 1. ПРОВЕРЯЕМ КЭШ
    const cached = getCache(cacheKey);
    if (cached) {
      setResults(cached);
      setOpen(true);
      return;
    }

    try {
      // 2. поиск POI
      const pois = await fetchAttractionsByName(value);

      if (pois.length > 0) {
        const mapped = pois.map((item: any) => ({
          display_name:
            item.tags?.name ||
            item.tags?.['name:en'] ||
            item.tags?.tourism ||
            item.tags?.historic ||
            'Unnamed place',
          lat: String(item.lat),
          lon: String(item.lon),
        }));

        const result = mapped.slice(0, 10);

        setResults(result);
        setCache(cacheKey, result); // 💾 сохраняем
        setOpen(true);
        return;
      }

      // 3. если не POI → город
      const city = await geocodeCity(value);

      const data = await fetchAttractionsByCity(city.lat, city.lon);

      const mapped = data
        .filter((item: any) => item.tags?.name || item.tags?.tourism || item.tags?.historic)
        .map((item: any) => ({
          display_name:
            item.tags?.name ||
            item.tags?.['name:en'] ||
            item.tags?.tourism ||
            item.tags?.historic ||
            'Unnamed place',
          lat: String(item.lat),
          lon: String(item.lon),
        }))
        .slice(0, 10);

      setResults(mapped);
      setCache(cacheKey, mapped); // 💾 сохраняем
      setOpen(true);
    } catch {
      setResults([]);
      setOpen(false);
    }
  };

  // 🔁 debounce trigger
  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Box>
      {/* INPUT */}
      <TextField
        fullWidth
        label="Search places or city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* RESULTS */}
      {open && results.length > 0 && (
        <Paper sx={{ mt: 1 }}>
          <List>
            {results.map((place, i) => (
              <ListItem
                key={place.display_name + i}
                button
                onClick={() => {
                  onSelect(place);

                  setQuery('');
                  setResults([]);
                  setOpen(false);
                }}
              >
                <ListItemText primary={place.display_name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
