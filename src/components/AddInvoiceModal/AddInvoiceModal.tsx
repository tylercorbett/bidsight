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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  minHeight: '30rem',
  justifyContent: 'space-between'
};

interface Props {
  isModalOpen: boolean,
  handleClose: () => void,
  handleSubmit: (invoice: any) => void
};

interface Invoice {
  name: string,
  category: string,
  dueDate:  string,
}

const defaultState = {
  name: '',
  category: '',
  dueDate: '01/25/2024',
  status: 'outstanding'
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit }) => {
  const [newInvoice, setNewInvoice] = useState(defaultState);

  const handleConfirmClicked = () => {
    handleSubmit(newInvoice);
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
          }}/>
        <TextField 
          id="outlined-basic" 
          label="Category" 
          variant="outlined" 
          required 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event.target.value, 'category');
          }}/>
        <DatePicker label='Due date' onChange={(newValue) => handleDateChange(newValue)} />
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
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm</Button>
      </Box>
      </Modal>
  );
}

export default AddInvoiceModal;
