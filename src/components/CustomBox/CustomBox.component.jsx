import React from 'react';

import { Box } from '@mui/material';

export default function CustomBox({ children, sx }) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.box',
        borderRadius: '16px',
        height: '100%',
        ...sx,
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      }}
    >
      {children}
    </Box>
  );
}
