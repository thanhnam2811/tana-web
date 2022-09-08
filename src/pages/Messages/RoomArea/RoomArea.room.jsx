import React from 'react';

import {
  Avatar,
  Badge,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import CustomBox from '../../../components/CustomBox/CustomBox.component';
import CustomIconButton from '../../../components/CustomIconButton/CustomIconButton.component';
import SearchInput from '../../../components/CustomInput/SearchInput.component';
import { listRoomDemo } from '../Messages.data';

export default function RoomArea() {
  const param = useParams();
  const nav = useNavigate();

  return (
    <CustomBox
      sx={{
        py: '8px',
      }}
    >
      {/* Room header */}
      <Box pr={'8px'} pl={'16px'}>
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          alignItems='stretch'
        >
          {/* Title Area */}
          <Grid item xs={6}>
            <Grid container justifyContent={'space-between'}>
              {/* Title */}
              <Grid item xs display={'flex'} alignItems={'center'}>
                <Badge badgeContent={10} color='error'>
                  <Typography variant='h5' fontWeight={700}>
                    Tin nhắn
                  </Typography>
                </Badge>
              </Grid>
              {/* Icon */}
              <Grid item xs='auto'>
                <CustomIconButton
                  Icon={FiEdit}
                  size={16}
                  tooltip={'Tin nhắn mới'}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Search bar */}
          <Grid item xs={6} pr={'8px'} my={'8px'}>
            <SearchInput placeholder={'Tìm kiếm tin nhắn'} />
          </Grid>
          {/* Divider */}
        </Grid>
      </Box>

      {/* Room list */}
      <Box overflow={'hidden auto'} maxHeight={'calc(100% - 95px - 16px)'}>
        <List
          sx={{
            width: '100%',
            p: 0,
            ml: '8px',
            pr: '16px',
          }}
        >
          {listRoomDemo.map((room, index) => {
            const active = room.id === param.roomId;
            return (
              <ListItem
                key={index}
                alignItems='flex-start'
                sx={{
                  mt: index ? 1 : 0,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  backgroundColor: active ? 'background.active' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'background.active',
                  },
                  transition: 'all ease-in-out .3s',
                }}
                onClick={() => nav(`/messages/${room.id}`)}
              >
                <ListItemAvatar>
                  <Avatar alt={room.name} src={room.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='subtitle2'>{room.name}</Typography>
                  }
                  secondary={
                    <Typography variant='body2' fontWeight={400} noWrap>
                      {room.preview}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </CustomBox>
  );
}
