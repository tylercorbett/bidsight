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
import { Invoice, Charge, InvoiceStatuses } from '../../types/invoice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { removeCharge } from '../../utils/removeCharge';
import dayjs from 'dayjs';
import Charges from '../Charges/Charges';

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
  handleSubmit: (invoice: any) => void,
  invoice: Invoice | null
};

const defaultState = {
  name: '',
  category: '',
  due_date: '',
  status: InvoiceStatuses.Outstanding
};

const EditInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit, invoice }) => {
  const [newInvoice, setNewInvoice] = useState<any>(invoice ?? defaultState);
  const [charges, setCharges] = useState<Charge[]>(invoice?.charges ?? []);

  const handleConfirmClicked = () => {
    const isInvalid = (newInvoice.name === '') || (newInvoice.category === '') || (newInvoice.due_date === '');
    if (isInvalid) {
      alert('Name, category, and due date are required');
    } else {
      handleSubmit({...newInvoice, charges });
      setNewInvoice(defaultState);
      setCharges([]);
    }
  };

  const handleInputChange = (inputValue: string, inputID: string) => {
    let newInvoiceState = {...newInvoice};
    newInvoiceState[inputID as keyof Invoice] = inputValue;
    setNewInvoice(newInvoiceState);
  };

  const handleDateChange = (newDate: any) => {
    const formattedDate = newDate.format('MM/DD/YYYY');
    handleInputChange(formattedDate, 'due_date')
  };

  const handleDeleteChargeClicked = (chargeToDelete: Charge) => {
    const chargesCopy = [...charges];
    const newChargesState = removeCharge(chargeToDelete, chargesCopy);
    setCharges(newChargesState);
  };  
  
  const handleAddChargeClicked = (chargeToAdd: Charge) => {
    const newChargesState = [chargeToAdd, ...charges];
    setCharges(newChargesState);
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
          Edit existing invoice
        </Typography>
        <TextField 
          id="outlined-basic" 
          label="Name" 
          variant="outlined"
          defaultValue={invoice?.name}
          required 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event.target.value, 'name');
          }}
        />
        <br />
        <TextField 
          id="outlined-basic" 
          label="Category" 
          variant="outlined" 
          defaultValue={invoice?.category}
          required 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event.target.value, 'category');
          }}
        />
        <br />
        <DatePicker 
          label='Due date' 
          onChange={(newValue) => handleDateChange(newValue)} 
          defaultValue={dayjs(invoice?.due_date)}
        />
        <br />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={invoice?.status}
            name="radio-buttons-group"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, 'status')}
          >
            <FormControlLabel value={InvoiceStatuses.Outstanding} control={<Radio />} label={InvoiceStatuses.Outstanding} />
            <FormControlLabel value={InvoiceStatuses.Paid} control={<Radio />} label={InvoiceStatuses.Paid} />
            <FormControlLabel value={InvoiceStatuses.Draft} control={<Radio />} label={InvoiceStatuses.Draft} />
          </RadioGroup>
        </FormControl>
        <br />
        <Charges 
          charges={charges}
          handleAddChargeClicked={handleAddChargeClicked}
          handleDeleteChargeClicked={handleDeleteChargeClicked}
        />
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm changes</Button>
      </Box>
      </Modal>
  );
}

export default EditInvoiceModal;
