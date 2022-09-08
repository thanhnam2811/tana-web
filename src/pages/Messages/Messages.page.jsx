import React from 'react';

import { Grid } from '@mui/material';
import CenterArea from '../../layout/Area/CenterArea.layout';
import LeftArea from '../../layout/Area/LeftArea.layout';
import RightArea from '../../layout/Area/RightArea.layout';
import DetailArea from './DetailArea/DetailArea.detail';
import MessageArea from './MessageArea/MessageArea.message';
import RoomArea from './RoomArea/RoomArea.room';

export default function Messages() {
  return (
    <Grid container m={0}>
      <LeftArea id='room__area'>
        <RoomArea />
      </LeftArea>

      <CenterArea id='message__area'>
        <MessageArea />
      </CenterArea>

      <RightArea id='room__detail'>
        <DetailArea />
      </RightArea>
    </Grid>
  );
}
