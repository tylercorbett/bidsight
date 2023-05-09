import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
  minHeight: '20rem',
  justifyContent: 'space-between'
};

interface Props {
  isModalOpen: boolean,
  handleClose: () => void,
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose }) => {
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
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="outstanding"
            name="radio-buttons-group"
          >
            <FormControlLabel value="outstanding" control={<Radio />} label="Outstanding" />
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            <FormControlLabel value="draft" control={<Radio />} label="Draft" />
          </RadioGroup>
        </FormControl>
        <Button variant='contained'>Confirm</Button>
      </Box>
      </Modal>
  );
}

export default AddInvoiceModal;
