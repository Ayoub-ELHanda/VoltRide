import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ScootersPage from './pages/ScootersPage';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                VoltRide - Gestion de Scooters Électriques
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ mt: 4, mb: 4, flex: '1 0 auto' }}>
            <Routes>
              <Route path="/" element={<ScootersPage />} />
              {/* Add more routes as needed */}
            </Routes>
          </Container>
          <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
            <Container maxWidth="sm">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} VoltRide - Tous droits réservés
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
