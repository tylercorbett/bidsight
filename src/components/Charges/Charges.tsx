import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChargeList from '../ChargeList/ChargeList';
import TextField from '@mui/material/TextField';
import { Charge } from '../../types/invoice';
import Button from '@mui/material/Button';
import { removeCharge } from '../../utils/removeCharge';

interface Props {
  charges: Charge[],
  setCharges: (charges: Charge[]) => void,
}

const Charges: React.FC<Props> = ({ charges, setCharges }) => {
  const [cost, setCost] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const resetChargeFields = () => {
    setCost('');
    setLabel('');
  };

  const onSubmit = () => {
    if (cost === '' || label === '') return;
    const newChargesState = [...charges, { cost, label }];
    setCharges(newChargesState);
    resetChargeFields();
  };

  const handleDeleteChargeClicked = (chargeToDelete: Charge) => {
    const chargesCopy = [...charges];
    const newChargesState = removeCharge(chargeToDelete, chargesCopy);
    setCharges(newChargesState);
  };

  return (
    <Box>
      <Typography id="charges-title" variant="h6" component="h2" marginBottom=".2rem">
        Charges
      </Typography>
      {charges.length > 0 
      ? <ChargeList 
          charges={charges}
          handleDeleteChargeClicked={handleDeleteChargeClicked}
        /> 
      : 
        <Typography id="charges-title" variant="body1" marginBottom=".6rem" color='gray'>
          There are currently no charges for this invoice
        </Typography>
      }
      <TextField 
        id="outlined-basic" 
        label="Label" 
        variant="outlined" 
        required
        value={label} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLabel(event.target.value);
        }}/>
      <TextField 
        id="outlined-basic" 
        label="Cost" 
        variant="outlined" 
        required 
        value={cost}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCost(event.target.value);
        }}
      />
      <Button onClick={onSubmit}>Add Charge</Button>
    </Box>
  );
};


export default Charges;
