import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import CustomBox from '../../components/CustomBox/CustomBox.component';
import LoginForm from './forms/LoginForm.auth';
import RegisterForm from './forms/RegisterForm.auth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      p={3}
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container maxWidth='1200px'>
        <Grid item xs={6} display={{ xs: 'none', md: 'block' }} height='600px'>
          <img
            src={process.env.PUBLIC_URL + '/Tana-logo-text.svg'}
            alt='TaNa'
          />
        </Grid>
        <Grid
          item
          xs
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <CustomBox sx={{ maxWidth: '600px', width: '100%', height: 'auto' }}>
            {isLogin ? (
              <LoginForm setIsLogin={setIsLogin} />
            ) : (
              <RegisterForm setIsLogin={setIsLogin} />
            )}
          </CustomBox>
        </Grid>
      </Grid>
    </Box>
  );
}
