import React, { useState } from 'react';

import './App.css';
import NavBar from './layout/NavBar/NavBar.layout';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import MainRoute from './routes/MainRoute.route';

const defaultTheme = {
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
};

const darkTheme = createTheme({});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1877f2',
    },
    inActive: {
      main: '#afbccb',
    },
    mode: 'light',
    background: {
      default: '#eef0f5',
      box: '#ffffff',
      active: '#1877f22f',
      primary: '#1877f2',
    },
  },
  ...defaultTheme,
});

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <NavBar setIsLightTheme={setIsLightTheme} isLightTheme={isLightTheme} />
      <MainRoute />
    </ThemeProvider>
  );
}

export default App;
