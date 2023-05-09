import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { Charge } from '../../types/invoice';

interface Props {
  charges: Charge[],
  handleDeleteChargeClicked: (chargeToDelete: Charge) => void
}

const ChargeList: React.FC<Props> = ({ charges, handleDeleteChargeClicked }) => {
  return (
    <List sx={{ width: '100%', margin: '0', paddingTop: '0' }}>
      {charges.map((charge) => (
        <ListItem
          key={`${charge.name}-${charge.value}`}
          secondaryAction={
            <IconButton aria-label="delete" onClick={() => handleDeleteChargeClicked(charge)}>
              <RemoveCircleOutlineIcon  color='error'/>
            </IconButton>
          }
        >
          <ListItemText primary={`$${charge.value} - ${charge.name}`} />
        </ListItem>
      ))}
    </List>
  );
}


export default ChargeList