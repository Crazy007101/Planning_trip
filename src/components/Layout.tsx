import { Box, Button } from '@mui/material';
import { useState } from 'react';
import TripHeader from '../components/TripHeader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import PlacesList from './PlaceList.tsx';
import Checklist from './CheckList.tsx';
import TripDetails from './TripDeatails.tsx';
import MapView from './MapView.tsx';
import type { ChecklistItem, Place, Trip } from '../types/types.ts';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [places, setPlaces] = useState<Place[]>([]);
  const [flight, setFlight] = useState('');
  const [hotel, setHotel] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const navigate = useNavigate();

  const buildTrip = (): Trip => {
    return {
      id: Date.now(),
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      places,
      items,
      flight,
      hotelName: hotel,
      hotelAddress: address,
    };
  };

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

          <PlacesList places={places} setPlaces={setPlaces} />
          <Checklist items={items} setItems={setItems} />
          <TripDetails
            flight={flight}
            setFlight={setFlight}
            hotel={hotel}
            setHotel={setHotel}
            address={address}
            setAddress={setAddress}
          />
          <Button
            variant="contained"
            onClick={() => {
              const trip = buildTrip();

              console.log('🚀 Trip object:', trip);

              const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');

              localStorage.setItem('trips', JSON.stringify([...savedTrips, trip]));

              console.log('💾 Saved trips:', [...savedTrips, trip]);

              navigate('/trips');
            }}
          >
            Save Trip
          </Button>
        </Box>

        {/* RIGHT MAP */}
        <Box sx={{ flex: 1, height: '100vh' }}>
          <MapView places={places} />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
