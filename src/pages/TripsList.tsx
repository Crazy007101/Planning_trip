import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import type { Trip } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function TripsList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('trips');
    if (saved) {
      setTrips(JSON.parse(saved));
    }
  }, []);

  const deleteTrip = (id: number) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem('trips', JSON.stringify(updated));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Trips
      </Typography>

      {trips.length === 0 && <Typography>No trips saved yet</Typography>}

      {trips.map((trip) => (
        <Card key={trip.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{trip.title}</Typography>

            <Typography variant="body2">
              {new Date(trip.startDate).toDateString()} → {new Date(trip.endDate).toDateString()}
            </Typography>

            <Typography variant="body2">✈ Flight: {trip.flight}</Typography>

            <Typography variant="body2">🏨 Hotel: {trip.hotelName}</Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              📍 Places: {trip.places.length}
            </Typography>

            <Button onClick={() => navigate(`/trip/${trip.id}`)}>Details</Button>

            <Button color="error" onClick={() => deleteTrip(trip.id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" onClick={() => navigate('/')}>
        Back
      </Button>
    </Box>
  );
}
