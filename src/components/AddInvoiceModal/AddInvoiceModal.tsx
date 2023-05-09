import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Invoice, Charge } from '../../types/invoice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ChargeList from '../ChargeList/ChargeList';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '.2rem',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '46rem'
};

interface Props {
  isModalOpen: boolean,
  handleClose: () => void,
  handleSubmit: (invoice: any) => void
};


const defaultState = {
  name: '',
  category: '',
  dueDate: '',
  status: 'outstanding',
};

const defaultChargeState = {
  name: '',
  value: ''
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit }) => {
  const [newInvoice, setNewInvoice] = useState<Invoice>(defaultState);
  const [charges, setCharges] = useState<Charge[]>([{name: 'Fix siding', value: '550.00'}]);
  const [newCharge, setNewCharge] = useState<Charge>(defaultChargeState);

  const handleConfirmClicked = () => {
    const isInvalid = (newInvoice.name === '') || (newInvoice.category === '') || (newInvoice.dueDate === '');
    if (isInvalid) {
      alert('Name, category, and due date are required');
    } else {
      handleSubmit({...newInvoice, charges});
      setNewInvoice(defaultState);
      setNewCharge(defaultChargeState);
      setCharges([]);
    }
  };

  const handleInputChange = (inputValue: string, inputID: string) => {
    let newInvoiceState = {...newInvoice};
    newInvoiceState[inputID as keyof Invoice] = inputValue;
    setNewInvoice(newInvoiceState);
  };

  const handleDateChange = (newDate: any) => {
    const formattedDate = newDate.toFormat('MM/dd/yyyy');
    handleInputChange(formattedDate, 'dueDate')
  };

  const handleCurrentChargeChange = (inputValue: string, inputID: string) => {
    let newChargeState = {...newCharge};
    newChargeState[inputID as keyof Charge] = inputValue;
    setNewCharge(newChargeState);
  };

  const handleAddChargeClicked = () => {
    setCharges([...charges, newCharge]);
    setNewCharge(defaultChargeState);
  };

  const handleDeleteChargeClicked = (chargeToDelete: Charge) => {
    let 
    console.log('charge to delete', chargeToDelete);
  };  

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={".5rem"}>
          Add new invoice
        </Typography>
        <TextField 
          id="outlined-basic" 
          label="Name" 
          variant="outlined" 
          required 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event.target.value, 'name');
          }}
        />
        <TextField 
          id="outlined-basic" 
          label="Category" 
          variant="outlined" 
          required 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event.target.value, 'category');
          }}
        />
        <DatePicker 
          label='Due date' 
          onChange={(newValue) => handleDateChange(newValue)} 
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="outstanding"
            name="radio-buttons-group"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, 'status')}
          >
            <FormControlLabel value="outstanding" control={<Radio />} label="Outstanding" />
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            <FormControlLabel value="draft" control={<Radio />} label="Draft" />
          </RadioGroup>
        </FormControl>
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
            label="Name" 
            variant="outlined" 
            required 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCurrentChargeChange(event.target.value, 'name');
            }}/>
          <TextField 
            id="outlined-basic" 
            label="Value" 
            variant="outlined" 
            required 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCurrentChargeChange(event.target.value, 'value');
            }}/>
          <Button onClick={handleAddChargeClicked}>Add Charge</Button>
        </Box>
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm</Button>
      </Box>
      </Modal>
  );
}

export default AddInvoiceModal;
