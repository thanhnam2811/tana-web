import React from 'react';

import { Avatar, Badge, IconButton, Tooltip, useTheme } from '@mui/material';

export default function CustomIconButton({
  tooltip,
  onClick,
  notifyCount,
  Icon,
  size,
  variant = 'default',
  sx,
}) {
  const theme = useTheme();

  const styleList = {
    default: {
      backgroundColor: 'background.default',
      color: theme.palette.inActive.main,
    },
    color: {
      backgroundColor: 'background.active',
      color: theme.palette.primary.main,
    },
  };

  return (
    <IconButton onClick={onClick} sx={{ ...sx }}>
      <Tooltip title={tooltip} disableHoverListener={!tooltip}>
        <Badge
          max={99}
          color='error'
          overlap='circular'
          badgeContent={notifyCount}
        >
          <Avatar sx={{ backgroundColor: styleList[variant].backgroundColor }}>
            <Icon color={styleList[variant].color} size={size} />
          </Avatar>
        </Badge>
      </Tooltip>
    </IconButton>
  );
}
