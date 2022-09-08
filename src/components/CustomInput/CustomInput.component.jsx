import React from 'react';

import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from '@mui/material';

export default function CustomInput({
  sx,
  onChange,
  placeholder,
  StartIcon,
  onStartIconClick,
  tooltipStartIcon,
  EndIcon,
  onEndIconClick,
  tooltipEndIcon,
  multiline,
}) {
  return (
    <FormControl
      sx={{
        ...sx,
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'background.default',
      }}
      fullWidth
    >
      <OutlinedInput
        onChange={onChange}
        multiline={multiline}
        maxRows={5}
        sx={{
          '& fieldset': {
            border: 'none',
          },
          '& .MuiInputBase-input': {
            py: '8px',
            pl: StartIcon ? '0' : '16px',
            pr: EndIcon ? '0' : '16px',
          },
          p: 0,
        }}
        startAdornment={
          StartIcon && (
            <InputAdornment sx={{ mr: 0 }} position='start'>
              <Tooltip
                title={tooltipStartIcon}
                disableHoverListener={!tooltipStartIcon}
              >
                <IconButton onClick={onStartIconClick} color='primary'>
                  <StartIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }
        endAdornment={
          EndIcon && (
            <InputAdornment sx={{ ml: 0 }} position='end'>
              <Tooltip
                title={tooltipEndIcon}
                disableHoverListener={!tooltipEndIcon}
              >
                <IconButton onClick={onEndIconClick} color='primary'>
                  <EndIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }
        placeholder={placeholder}
      />
    </FormControl>
  );
}
