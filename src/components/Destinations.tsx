import { Box, Container, Grid, Typography } from '@mui/material';
import { destinations } from '../data/destinations.ts';

export default function Destinations() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="xl">
        {/* Заголовок */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 2,
          }}
        >
          Popular Destinations
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
          }}
        >
          Explore the most loved places around the world
        </Typography>

        {/* Карточки */}
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {destinations.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                  '&:hover .overlay': {
                    background: 'rgba(0,0,0,0.6)',
                  },
                }}
              >
                {/* Картинка */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: '0.4s ease',
                  }}
                />

                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    transition: '0.3s',
                  }}
                />

                {/* Текст */}
                <Typography
                  variant="h5"
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
