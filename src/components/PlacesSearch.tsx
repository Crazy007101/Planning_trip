import { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

import { geocodeCity } from '../api/nominatim';
import { fetchAttractionsByCity, fetchAttractionsByName } from '../api/overpass';
import { useDebounce } from '../hooks/useDebounce';

type ApiPlace = {
  display_name: string;
  lat: string;
  lon: string;
};

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

    try {
      // 1. ищем POI по названию
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

        setResults(mapped.slice(0, 10));
        setOpen(true);
        return;
      }

      // 2. если POI нет → город
      const city = await geocodeCity(value);
      setCityCoords(city);

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
      setOpen(true);
    } catch (e) {
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
