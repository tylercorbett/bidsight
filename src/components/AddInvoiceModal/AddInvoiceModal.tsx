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
import ChargeList from '../ChargeList/ChargeList';
import { removeCharge } from '../../utils/removeCharge';
import { getRandomNumber } from '../../utils/getRandomNumber';
import dayjs from 'dayjs';

const today = dayjs().format('MM-DD-YYYY');

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
  dueDate: today,
  status: InvoiceStatuses.Outstanding
};

const defaultChargeState = {
  label: '',
  cost: ''
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit }) => {
  const [newInvoice, setNewInvoice] = useState<any>(defaultState);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [newCharge, setNewCharge] = useState<Charge>(defaultChargeState);

  const handleConfirmClicked = () => {
    const isInvalid = (newInvoice.name === '') || (newInvoice.category === '') || (newInvoice.dueDate === '');
    if (isInvalid) {
      alert('Name, category, and due date are required');
    } else {
      handleSubmit({...newInvoice, charges, id: getRandomNumber()});
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
    const formattedDate = newDate.format('MM/DD/YYYY');
    handleInputChange(formattedDate, 'dueDate')
  };

  const handleCurrentChargeChange = (inputValue: string, inputID: string) => {
    console.log(inputValue, 'inputValue');
    console.log(inputID, 'inputID');
    let newChargeState = {...newCharge};
    newChargeState[inputID as keyof Charge] = inputValue;
    setNewCharge(newChargeState);
  };

  const handleAddChargeClicked = () => {
    setCharges([...charges, newCharge]);
    setNewCharge(defaultChargeState);
  };

  const handleDeleteChargeClicked = (chargeToDelete: Charge) => {
    const chargesCopy = [...charges];
    const newChargesState = removeCharge(chargeToDelete, chargesCopy);
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
          defaultValue={dayjs(new Date())}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={InvoiceStatuses.Outstanding}
            name="radio-buttons-group"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value, 'status')}
          >
            <FormControlLabel value={InvoiceStatuses.Outstanding} control={<Radio />} label={InvoiceStatuses.Outstanding} />
            <FormControlLabel value={InvoiceStatuses.Paid} control={<Radio />} label={InvoiceStatuses.Paid} />
            <FormControlLabel value={InvoiceStatuses.Draft} control={<Radio />} label={InvoiceStatuses.Draft} />
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
            label="Label" 
            variant="outlined" 
            required 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCurrentChargeChange(event.target.value, 'label');
            }}/>
          <TextField 
            id="outlined-basic" 
            label="Cost" 
            variant="outlined" 
            required 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCurrentChargeChange(event.target.value, 'cost');
            }}/>
          <Button onClick={handleAddChargeClicked}>Add Charge</Button>
        </Box>
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm</Button>
      </Box>
      </Modal>
  );
}

export default AddInvoiceModal;
