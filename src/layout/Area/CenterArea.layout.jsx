import React from 'react';

import { Box, Grid } from '@mui/material';

export default function CenterArea(props) {
  return (
    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      display={'block'}
      height={{
        xs: 'calc(100vh - 56px)',
        sm: 'calc(100vh - 64px)',
      }}
    >
      <Box p={'16px'} height='100%'>
        {props.children}
      </Box>
    </Grid>
  );
}
