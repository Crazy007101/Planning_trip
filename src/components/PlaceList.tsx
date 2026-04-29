import { Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';

import PlacesSearch from './PlacesSearch';
import type { Place } from '../types/types.ts';

export default function PlacesList({
  places,
  setPlaces,
}: {
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
}) {
  // ❌ delete
  const deletePlace = (id: number) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  // ➕ add
  const addPlaceFromSearch = (place: any) => {
    const newPlace: Place = {
      id: Date.now(),
      name: place.display_name,
      lat: Number(place.lat),
      lng: Number(place.lon),
      visited: false,
    };

    setPlaces((prev) => [...prev, newPlace]);
  };

  // 🔄 toggle visited
  const toggleVisited = (id: number) => {
    setPlaces((prev) => prev.map((p) => (p.id === id ? { ...p, visited: !p.visited } : p)));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Places to visit
      </Typography>

      {/* 🔍 поиск */}
      <PlacesSearch onSelect={addPlaceFromSearch} />

      {/* 📋 список */}
      <List>
        {places.map((p) => (
          <ListItem
            key={p.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              px: 2,
              py: 1.2,
              borderRadius: 2,
              backgroundColor: p.visited ? '#f1f5f9' : '#ffffff',
              border: '1px solid',
              borderColor: p.visited ? '#e2e8f0' : '#e5e7eb',
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ListItemText
                primary={p.name}
                sx={{
                  textDecoration: p.visited ? 'line-through' : 'none',
                  color: p.visited ? '#64748b' : '#0f172a',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                flexShrink: 0,
                minWidth: 96,
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                onClick={() => toggleVisited(p.id)}
                size="small"
                sx={{
                  color: p.visited ? '#22c55e' : '#94a3b8',
                }}
              >
                {p.visited ? <UndoIcon /> : <CheckIcon />}
              </IconButton>

              <IconButton onClick={() => deletePlace(p.id)} size="small" sx={{ color: '#ef4444' }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
