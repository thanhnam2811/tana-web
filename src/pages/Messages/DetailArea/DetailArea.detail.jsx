import React, { Suspense, useState } from 'react';

import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { BsFileEarmarkImage, BsFileEarmarkZip, BsLink } from 'react-icons/bs';
import { FiBellOff, FiTrash, FiUserPlus } from 'react-icons/fi';
import CustomBox from '../../../components/CustomBox/CustomBox.component';
import CustomIconButton from '../../../components/CustomIconButton/CustomIconButton.component';
import { lazy } from 'react';

const TabStoreMedia = lazy(() => import('./TabStore/TabStoreMedia.detail'));
const TabStoreFile = lazy(() => import('./TabStore/TabStoreFile.detail'));
const TabStoreLink = lazy(() => import('./TabStore/TabStoreLink.detail'));

export default function DetailArea() {
  const listTabsStore = [
    {
      type: 'media',
      label: 'Ảnh/Video',
      icon: BsFileEarmarkImage,
      Tab: TabStoreMedia,
    },
    {
      type: 'file',
      label: 'Tập tin',
      icon: BsFileEarmarkZip,
      Tab: TabStoreFile,
    },
    { type: 'link', label: 'Liên kết', icon: BsLink, Tab: TabStoreLink },
  ];
  const [activeTabStore, setActiveTabStore] = useState(listTabsStore[0].type);

  return (
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
      <Box>
        <Tabs
          variant='fullWidth'
          value={activeTabStore}
          onChange={(e, val) => setActiveTabStore(val)}
          sx={{ minHeight: 0, borderBottom: 1, borderColor: 'divider' }}
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
        <Suspense fallback={<CircularProgress />}>
          {listTabsStore.map((tab) =>
            activeTabStore === tab.type ? <tab.Tab key={tab.type} /> : null
          )}
        </Suspense>
      </Box>
    </CustomBox>
  );
}
