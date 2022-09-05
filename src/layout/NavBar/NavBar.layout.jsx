import React from 'react';

import { useTheme } from '@emotion/react';
import { Divider, Grid, Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
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
              <Tabs
                value={
                  pages.find((page) => pathname.startsWith(page.path))?.path
                }
                onChange={(e, path) => nav(path)}
                aria-label='icon nav'
                sx={{
                  height: '100%',
                  '& div': {
                    height: '100%',
                  },
                  '& button': {
                    color: theme.palette.inActive.main,
                  },
                }}
              >
                {pages.map((page, index) => (
                  <Tab
                    value={page.path}
                    key={index}
                    icon={<page.icon color='inherit' size={24} />}
                    aria-label={page.label}
                    sx={{
                      display: page.display,
                      height: '100%',
                    }}
                    onClick={(e) => nav(page.path)}
                  />
                ))}
              </Tabs>
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
