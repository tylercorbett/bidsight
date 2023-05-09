import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
};

interface Props {
  isModalOpen: boolean,
  handleClose: () => void,
};

const AddInvoiceModal: React.FC<Props> = ({ isModalOpen, handleClose }) => {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new invoice
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AddInvoiceModal;
