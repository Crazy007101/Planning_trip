import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import TripHeader from '../components/TripHeader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import PlacesList from './PlaceList.tsx';
import Checklist from './CheckList.tsx';
import TripDetails from './TripDeatails.tsx';
import MapView from './MapView.tsx';
import type { ChecklistItem, Place, Trip } from '../types/types.ts';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const buildTrip = (): Trip => {
    return {
      id: isEditMode ? Number(id) : Date.now(),
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

  useEffect(() => {
    if (!id) return;

    const saved = localStorage.getItem('trips');

    if (!saved) return;

    const trips: Trip[] = JSON.parse(saved);

    const foundTrip = trips.find((t) => t.id === Number(id));

    if (!foundTrip) return;

    setTitle(foundTrip.title);
    setStartDate(dayjs(foundTrip.startDate));
    setEndDate(dayjs(foundTrip.endDate));

    setPlaces(foundTrip.places);

    setItems(foundTrip.items);

    setFlight(foundTrip.flight);

    setHotel(foundTrip.hotelName);

    setAddress(foundTrip.hotelAddress);
  }, [id]);

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              gap: 2,
            }}
          >
            {/* LEFT: primary action */}
            <Button
              variant="contained"
              onClick={() => {
                const trip = buildTrip();

                console.log('🚀 Trip object:', trip);

                const savedTrips: Trip[] = JSON.parse(localStorage.getItem('trips') || '[]');

                let updatedTrips: Trip[];

                if (isEditMode) {
                  updatedTrips = savedTrips.map((t) => (t.id === Number(id) ? trip : t));
                } else {
                  updatedTrips = [...savedTrips, trip];
                }

                localStorage.setItem('trips', JSON.stringify(updatedTrips));

                console.log('💾 Saved trips:', updatedTrips);

                navigate('/trips');
              }}
            >
              {isEditMode ? 'Update Trip' : 'Save Trip'}
            </Button>

            {/* RIGHT: secondary action */}
            <Button
              variant="outlined"
              onClick={() => navigate(isEditMode ? '/trips' : '/')}
              sx={{
                backgroundColor: '#fff',
                color: '#0f172a',
                borderColor: '#e2e8f0',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  borderColor: '#cbd5e1',
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* RIGHT MAP */}
        <Box sx={{ flex: 1, height: '100vh' }}>
          <MapView places={places} />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
