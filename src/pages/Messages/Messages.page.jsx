import React, { useRef, useState } from 'react';

import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  BsCursorFill,
  BsEmojiHeartEyesFill,
  BsFileEarmarkImage,
  BsFileEarmarkZip,
  BsFillCameraVideoFill,
  BsFillFileEarmarkFill,
  BsInfoCircleFill,
  BsLink,
  BsTelephoneFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { FaArrowDown } from 'react-icons/fa';
import { FiBellOff, FiEdit, FiTrash, FiUserPlus } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAvatarBadge from '../../components/CustomAvatarBadge/CustomAvatarBadge.component';
import CustomBox from '../../components/CustomBox/CustomBox.component';
import CustomIconButton from '../../components/CustomIconButton/CustomIconButton.component';
import CustomInput from '../../components/CustomInput/CustomInput.component';
import SearchInput from '../../components/CustomInput/SearchInput.component';
import CenterArea from '../../layout/Area/CenterArea.layout';
import LeftArea from '../../layout/Area/LeftArea.layout';
import RightArea from '../../layout/Area/RightArea.layout';
import useOnScreen from '../../utils/useOnScreen.hook';
import MessageContainer from './MessageContainer.component';
import { listMessagesDemo, listRoomDemo } from './Messages.data';

const MESS_PER_PAGE = 40;
const data = listMessagesDemo
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo);

const MessagesHistory = () => {
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const bottomRef = useRef(null);
  const atBottom = useOnScreen(bottomRef);

  const [messData, setMessData] = useState(
    data.slice(0, MESS_PER_PAGE)
    // .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
  );

  const handleLoadMore = () => {
    const moreMess = data.slice(
      messData.length,
      messData.length + MESS_PER_PAGE
    );
    setTimeout(
      () => setMessData((messData) => messData.concat(moreMess)),
      1000
    );
  };

  return (
    <Box
      id='messages-history'
      overflow='auto'
      height='100%'
      maxHeight='100%'
      display='flex'
      flexDirection='column-reverse'
    >
      <InfiniteScroll
        dataLength={messData.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={() => handleLoadMore()}
        hasMore={messData.length < data.length}
        inverse={true}
        loader={
          <Box key='loader' display='flex' justifyContent='center' m={2}>
            <CircularProgress />
          </Box>
        }
        scrollableTarget='messages-history'
      >
        <Slide direction='up' in={!atBottom} mountOnEnter unmountOnExit>
          <Box
            position='absolute'
            m='auto'
            left={0}
            right={0}
            bottom={0}
            display='flex'
            justifyContent='center'
          >
            <CustomIconButton
              onClick={() => scrollToRef(bottomRef)}
              tooltip='Mới nhất'
              variant='color'
              Icon={FaArrowDown}
            />
          </Box>
        </Slide>
        <Box ref={bottomRef} />
        {messData.map((item, index) => (
          <MessageContainer
            key={index}
            other={item.from === 'other'}
            text={item.message}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default function Messages() {
  const nav = useNavigate();
  const param = useParams();

  const listTabsStore = [
    { type: 'media', label: 'Ảnh/Video', icon: BsFileEarmarkImage },
    { type: 'file', label: 'Tập tin', icon: BsFileEarmarkZip },
    { type: 'link', label: 'Liên kết', icon: BsLink },
  ];
  const [activeTabStore, setActiveTabStore] = useState(listTabsStore[0].type);

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
            <Grid item xs overflow='hidden' position='relative'>
              <MessagesHistory />
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

      <RightArea id='room__detail'>
        <CustomBox>
          {/* Room detail */}
          <Grid container sx={{ p: 2 }}>
            {/* Detail */}
            <Grid
              item
              xs={12}
              display='flex'
              alignItems='center'
              flexDirection='column'
            >
              {/* Room Avatar */}
              <Avatar
                alt='Thái Thành Nam'
                src={process.env.PUBLIC_URL + '/static/images/avatar-nam.jpg'}
                sx={{
                  width: '80px',
                  height: '80px',
                }}
              />

              {/* Room Name */}
              <Typography variant='h5' fontWeight={700}>
                Thái Thành Nam
              </Typography>

              {/* Room status */}
              <Typography variant='subtitle2'>Đang hoạt động</Typography>
            </Grid>

            {/* Action */}
            <Grid item xs={12} px={4}>
              <Grid container>
                {/* Action Item */}
                <Grid
                  item
                  xs
                  display='flex'
                  alignItems='center'
                  flexDirection='column'
                >
                  {/* Action Button */}
                  <CustomIconButton variant='color' Icon={FiUserPlus} />
                  {/* Action Title */}
                  <Typography sx={{ mt: '-6px' }} variant='subtitle2'>
                    Tạo nhóm
                  </Typography>
                </Grid>
                {/* Action Item */}
                <Grid
                  item
                  xs
                  display='flex'
                  alignItems='center'
                  flexDirection='column'
                >
                  {/* Action Button */}
                  <CustomIconButton variant='color' Icon={FiBellOff} />
                  {/* Action Title */}
                  <Typography sx={{ mt: '-6px' }} variant='subtitle2'>
                    Tắt thông báo
                  </Typography>
                </Grid>
                {/* Action Item */}
                <Grid
                  item
                  xs
                  display='flex'
                  alignItems='center'
                  flexDirection='column'
                >
                  {/* Action Button */}
                  <CustomIconButton variant='color' Icon={FiTrash} />
                  {/* Action Title */}
                  <Typography sx={{ mt: '-6px' }} variant='subtitle2'>
                    Xóa
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Room store */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant='fullWidth'
              value={activeTabStore}
              onChange={(e, val) => setActiveTabStore(val)}
              sx={{ minHeight: 0 }}
            >
              {listTabsStore.map((tab) => (
                <Tab
                  icon={<tab.icon />}
                  iconPosition='start'
                  value={tab.type}
                  key={tab.type}
                  label={tab.label}
                  sx={{ textTransform: 'none', minHeight: 0 }}
                ></Tab>
              ))}
            </Tabs>
          </Box>
        </CustomBox>
      </RightArea>
    </Grid>
  );
}
