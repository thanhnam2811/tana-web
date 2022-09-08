import React from 'react';

import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  BsCursorFill,
  BsEmojiHeartEyesFill,
  BsFillCameraVideoFill,
  BsFillFileEarmarkFill,
  BsInfoCircleFill,
  BsTelephoneFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import CustomAvatarBadge from '../../../components/CustomAvatarBadge/CustomAvatarBadge.component';
import CustomBox from '../../../components/CustomBox/CustomBox.component';
import CustomIconButton from '../../../components/CustomIconButton/CustomIconButton.component';
import CustomInput from '../../../components/CustomInput/CustomInput.component';
import MessagesHistory from './components/MessagesHistory.message';

const MessageHeader = () => {
  return (
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
                      process.env.PUBLIC_URL + '/static/images/avatar-nam.jpg'
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
  );
};

const MessageInput = () => {
  return (
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
        <Grid item xs mx='8px'>
          <CustomInput
            multiline
            placeholder={'Soạn tin nhắn'}
            EndIcon={BsCursorFill}
            tooltipEndIcon={'Gửi'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default function MessageArea() {
  return (
    <CustomBox>
      {/* Message Header */}
      <MessageHeader />

      {/* Message Container */}
      <Grid
        container
        direction='column'
        wrap='nowrap'
        height='calc(100% - 69px)'
      >
        {/* Message History */}
        <Grid item xs overflow='hidden' position='relative'>
          <MessagesHistory />
        </Grid>

        {/* Message Input */}
        <Grid item xs='auto'>
          <MessageInput />
        </Grid>
      </Grid>
    </CustomBox>
  );
}
