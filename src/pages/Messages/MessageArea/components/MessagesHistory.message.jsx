import React, { useRef, useState } from 'react';

import { Box, CircularProgress, Slide } from '@mui/material';
import { FaArrowDown } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomIconButton from '../../../../components/CustomIconButton/CustomIconButton.component';
import useOnScreen from '../../../../hooks/useOnScreen.hook';
import MessageContainer from './MessageContainer.message';
import { listMessagesDemo } from '../../Messages.data';

const MESS_PER_PAGE = 40;
const data = listMessagesDemo
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo)
  .concat(listMessagesDemo);

export default function MessagesHistory() {
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
}
