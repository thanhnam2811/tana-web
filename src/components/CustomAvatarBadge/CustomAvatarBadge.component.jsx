import React from 'react';

import { Badge, styled } from '@mui/material';

const AvatarBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

export default function CustomAvatarBadge({ children, active }) {
  return (
    <AvatarBadge
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant='dot'
      invisible={!active}
    >
      {children}
    </AvatarBadge>
  );
}
