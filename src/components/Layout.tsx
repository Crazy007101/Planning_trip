import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import TripHeader from '../components/TripHeader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PlacesList from './PlaceList.tsx';
import Checklist from './CheckList.tsx';
import TripDetails from './TripDeatails.tsx';

export default function Layout() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', background: '#f1f5f9' }}>
        <Grid container>
          {/* LEFT SIDEBAR */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              p: 4,
              background: '#fff',
              height: '100vh',
              position: 'sticky',
              top: 0,
              borderRight: '1px solid #eee',
            }}
          >
            <TripHeader
              title={title}
              setTitle={setTitle}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />

            <PlacesList />

            <Checklist />

            <TripDetails />

            {/* дальше сюда добавим */}
          </Grid>

          {/* RIGHT CONTENT */}
          <Grid item xs={12} md={8} sx={{ p: 4 }}>
            Right content (map later)
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
