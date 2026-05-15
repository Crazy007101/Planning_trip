import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, Stack } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f1f5f9',
        p: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 800,
          color: '#0f172a',
        }}
      >
        My Trips
      </Typography>

      {trips.length === 0 && <Typography color="text.secondary">No trips saved yet</Typography>}

      <Stack spacing={3}>
        {trips.map((trip) => (
          <Card
            key={trip.id}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              transition: '0.25s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
              },
            }}
          >
            {/* IMAGE HEADER */}
            <Box
              sx={{
                height: 180,
                backgroundImage: `url(${trip.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  color: '#fff',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  {trip.title}
                </Typography>

                <Chip
                  icon={<CalendarMonthIcon />}
                  label={`${new Date(trip.startDate).toDateString()} → ${new Date(
                    trip.endDate,
                  ).toDateString()}`}
                  sx={{
                    mt: 1,
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Box>
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FlightIcon color="primary" />

                  <Typography>
                    <strong>Flight:</strong> {trip.flight || 'Not specified'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <HotelIcon color="primary" />

                  <Typography>
                    <strong>Hotel:</strong> {trip.hotelName || 'Not specified'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <PlaceIcon color="primary" />

                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Places to visit</Typography>

                    {trip.places.slice(0, 3).map((place) => (
                      <Typography key={place.id} variant="body2" color="text.secondary">
                        • {place.name}
                      </Typography>
                    ))}

                    {trip.places.length > 3 && (
                      <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                        +{trip.places.length - 3} more places
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* ACTIONS */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Details
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteTrip(trip.id)}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          mt: 4,
          borderRadius: 3,
          px: 4,
          py: 1.2,
          textTransform: 'none',
          fontWeight: 700,
        }}
      >
        Back
      </Button>
    </Box>
  );
}
