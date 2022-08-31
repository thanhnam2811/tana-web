import React from 'react';

import { Box, Grid } from '@mui/material';

export default function RightArea(props) {
  return (
    <Grid
      item
      lg={3}
      display={{
        xs: 'none',
        lg: 'block',
      }}
      height={{
        xs: 'calc(100vh - 56px)',
        sm: 'calc(100vh - 64px)',
      }}
    >
      <Box p={'16px'} pl={0} height='100%'>
        {props.children}
      </Box>
    </Grid>
  );
}
