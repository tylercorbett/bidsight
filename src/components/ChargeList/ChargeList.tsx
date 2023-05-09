import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { Charge } from '../../types/invoice';

interface Props {
  charges: Charge[]
}

const ChargeList: React.FC<Props> = ({ charges }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {charges.map((charge) => (
        <ListItem
          key={`${charge.name}-${charge.value}`}
          secondaryAction={
            <IconButton aria-label="delete">
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