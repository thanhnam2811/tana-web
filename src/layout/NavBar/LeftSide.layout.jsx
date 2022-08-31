import React from 'react';

import { Avatar, Grid, IconButton } from '@mui/material';
import SearchInput from '../../components/CustomInput/SearchInput.component';

export default function LeftSide() {
  return (
    <Grid
      item
      xs='auto'
      sx={{
        display: {
          xs: 'none',
          sm: 'flex',
        },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton>
        <Avatar alt='Logo' src={process.env.PUBLIC_URL + '/TaNa-logo.svg'} />
      </IconButton>
      <SearchInput
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
        placeholder={'Tìm kiếm'}
      />
    </Grid>
  );
}
