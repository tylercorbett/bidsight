import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Charge, InvoiceStatuses, InvoiceBody } from '../../types/invoice';
import { removeCharge } from '../../utils/removeCharge';
import { getRandomNumber } from '../../utils/getRandomNumber';
import dayjs from 'dayjs';
import Charges from '../Charges/Charges';
import InvoiceBaseInputFields from '../InvoiceBaseInputFields/InvoiceBaseInputFields';
import { modalBaseStyles } from '../shared/modalBaseStyles';

const today = dayjs().format('MM-DD-YYYY');

interface Props {
  isModalOpen: boolean,
  handleClose: () => void,
  handleSubmit: (invoice: any) => void
};

const defaultState = {
  name: '',
  category: '',
  due_date: today,
  status: InvoiceStatuses.Outstanding
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose, handleSubmit }) => {
  const [newInvoice, setNewInvoice] = useState<any>(defaultState);
  const [charges, setCharges] = useState<Charge[]>([]);

  const handleConfirmClicked = () => {
    const isInvalid = (newInvoice.name === '') || (newInvoice.category === '');
    if (isInvalid) {
      alert('Name and category are required');
    } else {
      handleSubmit({...newInvoice, charges, id: getRandomNumber() });
      setNewInvoice(defaultState);
      setCharges([]);
    }
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
      <Box sx={modalBaseStyles}>
        <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={".5rem"}>
          Add new invoice
        </Typography>
        <InvoiceBaseInputFields 
          invoice={newInvoice}
          handleChange={(invoiceBody: InvoiceBody) => setNewInvoice(invoiceBody)}
        />
        <br />
        <Charges 
          charges={charges}
          handleAddChargeClicked={handleAddChargeClicked}
          handleDeleteChargeClicked={handleDeleteChargeClicked}
        />
        <br />
        <Button variant='contained' type='submit' onClick={handleConfirmClicked}>Confirm</Button>
      </Box>
      </Modal>
  );
}

export default AddInvoiceModal;
