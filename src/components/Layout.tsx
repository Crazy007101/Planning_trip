import { Box } from '@mui/material';
import { useState } from 'react';
import TripHeader from '../components/TripHeader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import PlacesList from './PlaceList.tsx';
import Checklist from './CheckList.tsx';
import TripDetails from './TripDeatails.tsx';
import MapView from './MapView.tsx';

export default function Layout() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
        {/* LEFT SIDEBAR */}
        <Box
          sx={{
            width: 380,
            p: 4,
            background: '#fff',
            borderRight: '1px solid #eee',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
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
        </Box>

        {/* RIGHT MAP */}
        <Box sx={{ flex: 1, height: '100vh' }}>
          <MapView />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
