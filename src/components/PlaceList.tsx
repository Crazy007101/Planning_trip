import { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PlacesList() {
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);

  const addPlace = () => {
    if (!place.trim()) return;

    setPlaces([...places, place]);
    setPlace('');
  };

  const deletePlace = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Заголовок */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Places to visit
      </Typography>

      {/* Input + button */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Add place (e.g. Paris)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <Button variant="contained" onClick={addPlace}>
          Add
        </Button>
      </Box>

      {/* List */}
      <List>
        {places.map((p, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#f8fafc',
              mb: 1,
              borderRadius: 2,
              px: 2,
            }}
          >
            {p}

            <IconButton onClick={() => deletePlace(index)} size="small">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
