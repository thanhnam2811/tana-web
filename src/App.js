import React, { useEffect, useState } from 'react';

import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './layout/NavBar/NavBar.layout';
import { getUser } from './redux/slice/userSlice';
import MainRoute from './routes/MainRoute.route';
import useToken from './hooks/useToken.hook';

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
  const { token } = useToken();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  if (user.isFetching)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <NavBar setIsLightTheme={setIsLightTheme} isLightTheme={isLightTheme} />
      <MainRoute />
    </ThemeProvider>
  );
}

export default App;
