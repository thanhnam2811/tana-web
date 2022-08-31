import React from 'react';

import { FiSearch } from 'react-icons/fi';
import CustomInput from './CustomInput.component';

export default function SearchInput({ sx, placeholder }) {
  return (
    <CustomInput
      sx={sx}
      StartIcon={FiSearch}
      tooltipStartIcon={'Tìm kiếm'}
      placeholder={placeholder}
    />
  );
}
