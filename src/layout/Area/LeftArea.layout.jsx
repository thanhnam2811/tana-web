import React from 'react';

import { Box, Grid } from '@mui/material';

export default function LeftArea(props) {
  return (
    <Grid
      item
      md={4}
      lg={3}
      display={{
        xs: 'none',
        md: 'block',
      }}
      height={{
        xs: 'calc(100vh - 56px)',
        sm: 'calc(100vh - 64px)',
      }}
    >
      <Box p={'16px'} pr={0} height='100%'>
        {props.children}
      </Box>
    </Grid>
  );
}
