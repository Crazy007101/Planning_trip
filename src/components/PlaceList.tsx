import { useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlacesSearch from './PlacesSearch';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';

type Place = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
};

export default function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);

  const deletePlace = (id: number) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

  const addPlaceFromSearch = (place: any) => {
    setPlaces([
      ...places,
      {
        id: Date.now(),
        name: place.display_name,
        lat: Number(place.lat),
        lng: Number(place.lon),
        visited: false,
      },
    ]);
  };

  const toggleVisited = (id: number) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              visited: !p.visited,
            }
          : p,
      ),
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Places to visit
      </Typography>

      <PlacesSearch onSelect={addPlaceFromSearch} />

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
