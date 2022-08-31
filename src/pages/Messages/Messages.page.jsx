import React from 'react';

import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import {
  BsCursorFill,
  BsEmojiHeartEyesFill,
  BsFillCameraVideoFill,
  BsFillFileEarmarkFill,
  BsInfoCircleFill,
  BsTelephoneFill,
  BsThreeDotsVertical
} from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import CustomAvatarBadge from '../../components/CustomAvatarBadge/CustomAvatarBadge.component';
import CustomBox from '../../components/CustomBox/CustomBox.component';
import CustomIconButton from '../../components/CustomIconButton/CustomIconButton.component';
import CustomInput from '../../components/CustomInput/CustomInput.component';
import SearchInput from '../../components/CustomInput/SearchInput.component';
import CenterArea from '../../layout/Area/CenterArea.layout';
import LeftArea from '../../layout/Area/LeftArea.layout';
import RightArea from '../../layout/Area/RightArea.layout';
import MessageContainer from './MessageContainer.component';
import { listMessagesDemo, listRoomDemo } from './Messages.data';

export default function Messages() {
  const nav = useNavigate();
  const param = useParams();

  return (
    <Grid container m={0}>
      <LeftArea id='room__area'>
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
                      backgroundColor: active
                        ? 'background.active'
                        : 'transparent',
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
      </LeftArea>

      <CenterArea id='message__area'>
        <CustomBox>
          {/* Chat Header */}
          <Box
            sx={{
              borderStartStartRadius: 'inherit',
              borderStartEndRadius: 'inherit',
            }}
          >
            <Grid container justifyContent='space-between'>
              <Grid item xs='auto'>
                {/* Room Avatar + Name */}
                <Grid container>
                  <Grid item xs='auto'>
                    <IconButton>
                      <CustomAvatarBadge active>
                        <Avatar
                          alt='Thái Thành Nam'
                          src={
                            process.env.PUBLIC_URL +
                            '/static/images/avatar-nam.jpg'
                          }
                          sx={{
                            width: '52px',
                            height: 'auto',
                          }}
                        />
                      </CustomAvatarBadge>
                    </IconButton>
                  </Grid>
                  <Grid item xs='auto'>
                    <Box
                      justifyContent='center'
                      display='flex'
                      flexDirection='column'
                      py='8px'
                    >
                      <Typography variant='h6'>Thái Thành Nam</Typography>
                      <Typography variant='caption'>Đang hoạt động</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs='auto' display='flex' alignItems='center'>
                <Box justifyContent='center' display='flex'>
                  {/* Room action */}
                  <CustomIconButton
                    tooltip={'Gọi thoại'}
                    Icon={BsTelephoneFill}
                    variant='color'
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline',
                      },
                    }}
                  />
                  <CustomIconButton
                    tooltip={'Gọi video'}
                    Icon={BsFillCameraVideoFill}
                    variant='color'
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline',
                      },
                    }}
                  />
                  <CustomIconButton
                    tooltip={'Thông tin'}
                    Icon={BsInfoCircleFill}
                    variant='color'
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline',
                        lg: 'none',
                      },
                    }}
                  />
                  <CustomIconButton
                    tooltip={'Thêm'}
                    Icon={BsThreeDotsVertical}
                    variant='color'
                    sx={{
                      display: {
                        xs: 'inline',
                        sm: 'none',
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider
              sx={{
                backgroundColor: 'inActive.main',
              }}
            />
          </Box>

          {/* Chat Container */}
          <Grid
            container
            direction='column'
            wrap='nowrap'
            height='calc(100% - 69px)'
          >
            <Grid item xs overflow='hidden'>
              <ScrollToBottom
                mode='bottom'
                className='STB-container'
                scrollViewClassName='STB-view'
                followButtonClassName='STB-button'
              >
                {listMessagesDemo.map((item) => (
                  <MessageContainer
                    key={item.id}
                    other={item.from === 'other'}
                    text={item.message}
                  />
                ))}
              </ScrollToBottom>
            </Grid>
            <Grid item xs='auto'>
              {/* Chat Input */}
              <Box
                backgroundColor='inherit'
                sx={{
                  borderEndStartRadius: 'inherit',
                  borderEndEndRadius: 'inherit',
                }}
              >
                <Divider
                  sx={{
                    backgroundColor: 'inActive.main',
                  }}
                />
                <Grid container alignItems='center'>
                  <Grid item xs='auto'>
                    <CustomIconButton
                      tooltip={'Chọn ảnh, video, tập tin'}
                      Icon={BsFillFileEarmarkFill}
                      variant='color'
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    <CustomIconButton
                      tooltip={'Chọn biểu cảm'}
                      Icon={BsEmojiHeartEyesFill}
                      variant='color'
                    />
                  </Grid>
                  <Grid item xs mr='8px'>
                    <CustomInput
                      placeholder={'Soạn tin nhắn'}
                      EndIcon={BsCursorFill}
                      tooltipEndIcon={'Gửi'}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CustomBox>
      </CenterArea>

      <RightArea>
        <CustomBox></CustomBox>
      </RightArea>
    </Grid>
  );
}
