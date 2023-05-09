import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './InvoiceFilters.css';

interface Props {
  checkedFilters: boolean[],
  setCheckedFilters: (checkedArray: boolean[]) => void
}

const InvoiceFilters: React.FC<Props> = ({ setCheckedFilters, checkedFilters }) => {
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFilters([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFilters([event.target.checked, checkedFilters[1], checkedFilters[2], checkedFilters[3]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFilters([checkedFilters[0], event.target.checked, checkedFilters[2], checkedFilters[3]]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFilters([checkedFilters[0], checkedFilters[1], event.target.checked, checkedFilters[3]]);
  };

  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFilters([checkedFilters[0], checkedFilters[1], checkedFilters[2], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', ml: 3 }}>
      <FormControlLabel
        label="Paid"
        control={<Checkbox checked={checkedFilters[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Outstanding"
        control={<Checkbox checked={checkedFilters[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Late"
        control={<Checkbox checked={checkedFilters[2]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Draft"
        control={<Checkbox checked={checkedFilters[3]} onChange={handleChange5} />}
      />
    </Box>
  );

  return (
    <div className='InvoiceFilters'>
      <FormControlLabel
        label="All"
        control={
          <Checkbox
            checked={checkedFilters[0] && checkedFilters[1] && checkedFilters[2] && checkedFilters[3]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}

export default InvoiceFilters;
