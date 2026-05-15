import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent={'space-between'} spacing={2}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              ✈️ Travel Planner
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
              Plan your journeys, discover destinations and create unforgettable memories.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Navigation</Typography>

            <Link
              href="/"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1, opacity: 0.8 }}
            >
              Home
            </Link>
            <Link
              href="/create"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1, opacity: 0.8 }}
            >
              Create Journey
            </Link>
            <Link
              href="/trips"
              underline="none"
              color="inherit"
              display="block"
              sx={{ opacity: 0.8 }}
            >
              My Trips
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Contact</Typography>

            <Typography sx={{ opacity: 0.8 }}>Email: support@travelplanner.com</Typography>

            <Typography sx={{ opacity: 0.8 }}>
              © {new Date().getFullYear()} Travel Planner
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
