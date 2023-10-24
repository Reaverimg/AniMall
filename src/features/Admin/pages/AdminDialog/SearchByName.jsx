import { TextField } from '@mui/material';
import React, { useState } from 'react';

const SearchByName = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      style={{
        marginLeft: 'auto',
        marginRight: '10px',
        backgroundColor: 'white'
      }}
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export default SearchByName;