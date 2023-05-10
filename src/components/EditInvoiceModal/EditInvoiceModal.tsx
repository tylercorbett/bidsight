import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Invoice, Charge, InvoiceStatuses } from '../../types/invoice';
import { removeCharge } from '../../utils/removeCharge';
import Charges from '../Charges/Charges';
import InvoiceBaseInputFields from '../InvoiceBaseInputFields/InvoiceBaseInputFields';

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
  invoice: Invoice
};

const defaultState = {
  name: '',
  category: '',
  due_date: '',
  status: InvoiceStatuses.Outstanding
};

const EditInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit, invoice }) => {
  const [newInvoice, setNewInvoice] = useState<any>(invoice);
  const [charges, setCharges] = useState<Charge[]>(invoice.charges ?? []);

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
        <InvoiceBaseInputFields 
          invoice={invoice}
        />
        <br />
        <Charges 
          charges={charges}
          handleAddChargeClicked={handleAddChargeClicked}
          handleDeleteChargeClicked={handleDeleteChargeClicked}
        />
        <br />
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm changes</Button>
      </Box>
      </Modal>
  );
}

export default EditInvoiceModal;
