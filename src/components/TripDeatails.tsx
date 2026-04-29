import { Box, TextField, Typography } from '@mui/material';
import type { TripDetailsProps } from '../types/types.ts';

export default function TripDetails({
  flight,
  setFlight,
  hotel,
  setHotel,
  address,
  setAddress,
}: TripDetailsProps) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Trip Details
      </Typography>

      {/* Flight */}
      <TextField
        fullWidth
        label="Flight info (e.g. LH1234)"
        value={flight}
        onChange={(e) => setFlight(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Hotel */}
      <TextField
        fullWidth
        label="Hotel name"
        value={hotel}
        onChange={(e) => setHotel(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
