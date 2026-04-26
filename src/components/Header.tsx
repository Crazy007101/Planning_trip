import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* ЛОГО */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '.15rem',
                color: '#fff',
              }}
            >
              Travel Planner
            </Typography>
          </Box>

          {/* КНОПКИ */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/create')}
              sx={{
                background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '20px',
                px: 3,
                textTransform: 'none',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                },
              }}
            >
              ✈️ Create Journey
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/list')}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
                borderRadius: '20px',
                px: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: '#fff',
                },
              }}
            >
              🌍 My Trips
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
