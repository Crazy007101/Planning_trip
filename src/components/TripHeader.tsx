import { Box, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

type TripHeaderProps = {
  title: string;
  setTitle: (value: string) => void;
  startDate: any;
  setStartDate: (value: any) => void;
  endDate: any;
  setEndDate: (value: any) => void;
};
export default function TripHeader({
  title,
  setTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: TripHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Заголовок */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Trip Info
      </Typography>

      {/* Название */}
      <TextField
        fullWidth
        label="Trip title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Даты */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          sx={{ flex: 1 }}
        />

        <DatePicker
          label="End date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
}
