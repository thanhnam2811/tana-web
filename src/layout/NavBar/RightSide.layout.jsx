import React, { useState } from 'react';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import {
  Avatar,
  Badge,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { FcFaq, FcLike, FcStackOfPhotos } from 'react-icons/fc';
import { FiBell } from 'react-icons/fi';
import CustomIconButton from '../../components/CustomIconButton/CustomIconButton.component';

const listNotifyDemo = [
  {
    content:
      'Nam đã bình luận về 1 bài viết mà bạn theo dõi, Nam đã bình luận về 1 bài viết mà bạn theo dõi, Nam đã bình luận về 1 bài viết mà bạn theo dõi',
    actionID: 'abc',
    type: 'comment',
  },
  {
    content: 'Nam đăng bài viết mới',
    actionID: 'abc',
    type: 'post',
  },
  {
    content: 'Nam đã bày tỏ cảm xúc về bài viết của bạn',
    actionID: 'abc',
    type: 'react',
  },
];

const listTypeNotify = [
  {
    type: 'comment',
    icon: FcFaq,
  },
  {
    type: 'post',
    icon: FcStackOfPhotos,
  },
  {
    type: 'react',
    icon: FcLike,
  },
];

export default function RightSide({ isLightTheme, setIsLightTheme }) {
  const [profileMenuEl, setProfileMenuEl] = useState();
  const openProfileMenu = Boolean(profileMenuEl);

  const [notifyMenuEl, setNotifyMenuEl] = useState();
  const openNotifyMenu = Boolean(notifyMenuEl);

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
      <CustomIconButton
        tooltip={'Thông báo'}
        onClick={(e) => setNotifyMenuEl(e.target)}
        notifyCount={10}
        Icon={FiBell}
      />

      <Menu
        sx={{
          marginTop: 1,
          marginRight: 1,
        }}
        anchorEl={notifyMenuEl}
        open={openNotifyMenu}
        onClose={() => setNotifyMenuEl()}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {listNotifyDemo.map((notify, index) => {
          const Icon = listTypeNotify.find(
            (item) => notify.type === item.type
          )?.icon;

          return (
            <MenuItem
              key={index}
              sx={{
                marginBottom: 1,
                maxWidth: {
                  sm: '400px',
                  lg: '600px',
                },
              }}
            >
              <Badge
                sx={{
                  marginRight: 1,
                }}
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar
                    sx={{
                      width: 22,
                      height: 22,
                      bgcolor: 'white',
                    }}
                  >
                    {Icon && <Icon size={20} />}
                  </Avatar>
                }
              >
                <Avatar
                  alt='Thái Thành Nam'
                  src='./static/images/avatar-nam.jpg'
                />
              </Badge>
              <Typography variant='body2' sx={{ whiteSpace: 'normal' }}>
                {notify.content}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>

      <Tooltip title='Thái Thành Nam'>
        <IconButton onClick={(e) => setProfileMenuEl(e.target)}>
          <Avatar
            alt='Ảnh đại diện'
            src={process.env.PUBLIC_URL + '/static/images/avatar-nam.jpg'}
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{
          marginTop: 1,
        }}
        anchorEl={profileMenuEl}
        open={openProfileMenu}
        onClose={() => setProfileMenuEl()}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize='small' />
          </ListItemIcon>
          Trang cá nhân
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Thêm tài khoản
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={() => setIsLightTheme((prev) => !prev)}>
          <ListItemIcon>
            {isLightTheme ? (
              <DarkModeRoundedIcon fontSize='small' />
            ) : (
              <LightModeRoundedIcon fontSize='small' />
            )}
          </ListItemIcon>
          Chế độ {isLightTheme ? 'tối' : 'sáng'}
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </Grid>
  );
}
