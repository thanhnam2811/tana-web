import React from 'react';

import { useTheme } from '@emotion/react';
import { Badge, Divider, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import {
  FiBell,
  FiHome,
  FiMenu,
  FiMessageSquare,
  FiSearch,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSide from './LeftSide.layout';
import RightSide from './RightSide.layout';
const pages = [
  {
    label: 'Trang chủ',
    icon: FiHome,
    path: '/home',
  },
  {
    label: 'Bạn bè',
    icon: FiUsers,
    path: '/friends',
  },
  {
    label: 'Tin nhắn',
    icon: FiMessageSquare,
    path: '/messages',
  },
  {
    label: 'Trang cá nhân',
    icon: FiUser,
    path: '/profile',
    display: {
      xs: 'none',
      sm: 'block',
    },
  },
  {
    label: 'Tìm kiếm',
    icon: FiSearch,
    display: {
      xs: 'block',
      md: 'none',
    },
    path: '/search',
  },
  {
    label: 'Thông báo',
    icon: FiBell,
    display: {
      xs: 'block',
      sm: 'none',
    },
    path: '/notification',
  },
  {
    label: 'Menu',
    icon: FiMenu,
    display: {
      xs: 'block',
      sm: 'none',
    },
    path: '/menu',
  },
];

export default function NavBar({ isLightTheme, setIsLightTheme }) {
  const theme = useTheme();

  const nav = useNavigate();

  const { pathname } = useLocation();

  return (
    <AppBar
      position='static'
      sx={{
        boxShadow: 'none',
        backgroundColor: 'background.box',
      }}
    >
      <Container maxWidth='xxl' sx={{ px: 0 }}>
        <Toolbar disableGutters>
          <Grid
            container
            sx={{
              minHeight: 'inherit',
            }}
          >
            {/* Left Area */}
            <LeftSide />

            {/* Main Nav Area */}
            <Grid
              className='hide-scrollbar'
              item
              xs={12}
              sm
              sx={{
                display: 'flex',
                justifyContent: {
                  sm: 'center',
                  xs: 'space-between',
                },
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              {pages.map((page, index) => {
                const active = pathname.startsWith(page.path);
                return (
                  <Tooltip title={page.label} key={index}>
                    <Button
                      sx={{
                        px: {
                          xs: 2,
                          sm: 3,
                          md: 4,
                        },
                        height: '100%',
                        borderRadius: '0',
                        display: page.display || 'block',
                        minWidth: 'max-content',
                        borderBottom: active
                          ? `2px solid ${theme.palette.primary.main}`
                          : 'none',
                      }}
                      aria-label={page.label}
                      color={active ? 'primary' : 'inActive'}
                      onClick={() => {
                        nav(page.path);
                      }}
                    >
                      <Badge
                        max={99}
                        color='error'
                        badgeContent={page.countNotify}
                      >
                        {<page.icon color='inherit' size={24} />}
                      </Badge>
                    </Button>
                  </Tooltip>
                );
              })}
            </Grid>

            {/* Right Nav Area */}
            <RightSide isLightTheme setIsLightTheme />
          </Grid>
        </Toolbar>
      </Container>
      <Divider
        sx={{
          height: '2px !important',
          backgroundColor: 'inActive.main',
        }}
      />
    </AppBar>
  );
}
