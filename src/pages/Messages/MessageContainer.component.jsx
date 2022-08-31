import React from 'react';

import { Avatar, Box, Grid, Typography } from '@mui/material';

export default function MessageContainer({
  text,
  other,
  avatar = '/static/images/avatar-nam.jpg',
}) {
  return (
    <Grid
      container
      width='100%'
      gap='8px'
      py={1}
      px={2}
      justifyContent={other ? 'flex-start' : 'flex-end'}
    >
      {/* Avatar */}
      {other && (
        <Grid item xs='auto'>
          <Avatar
            sx={{
              width: '32px',
              height: '32px',
            }}
            alt='Thái Thành Nam'
            src={process.env.PUBLIC_URL + avatar}
          />
        </Grid>
      )}
      {/* Message */}
      <Grid item xs='auto' width='fit-content !important'>
        <Box
          borderRadius={other ? '4px 16px 16px 16px' : '16px 4px 16px 16px'}
          p='8px'
          sx={{
            backgroundColor: other
              ? 'background.default'
              : 'background.primary',
            color: other ? 'black' : 'white',
          }}
        >
          <Typography fontSize={'15px'} fontWeight={400}>
            {text}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
