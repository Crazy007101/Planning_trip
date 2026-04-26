import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import CreateJourney from './pages/CreateJourney';
import Home from './pages/Home.tsx';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJourney />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
