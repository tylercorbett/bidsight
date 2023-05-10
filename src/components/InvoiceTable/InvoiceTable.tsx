import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { isLate } from '../../utils/isLate';
import { Invoice } from '../../types/invoice';
import Chip from '@mui/material/Chip';
import { getInvoiceColorStatus } from '../../utils/getInvoiceColorStatus';
import EditIcon from '@mui/icons-material/Edit';
import './InvoiceTable.css';

interface RowProps {
  row: Invoice,
  handleEditClick: (invoice: Invoice) => void,
}

const Row:React.FC<RowProps> = ({ row, handleEditClick }) => {
  const [open, setOpen] = useState(false);

  const hasCharges = row.charges.length > 0;
  const isInvoiceLate = isLate(row.due_date, row.status);
  const statusLabel = isInvoiceLate ? 'Late' : row.status;
  const statusColor = getInvoiceColorStatus(row);
  const totalCost = row.charges.reduce((total, charge) => total + parseInt(charge.cost), 0);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {hasCharges && <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right"><Chip color={statusColor} label={statusLabel} /></TableCell>
        <TableCell align="right" sx={{textTransform: 'capitalize'}}>{row.category}</TableCell>
        <TableCell align="right">{row.due_date || '-'}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" size='small' onClick={() => handleEditClick(row)}>
            <EditIcon fontSize='small'/>
          </IconButton>
        </TableCell>
      </TableRow>
      {hasCharges && <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} style={{display: 'flex', width: '100%'}}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cost</TableCell>
                    <TableCell>Purchase</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.charges.map((chargeRow, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {chargeRow.cost}
                      </TableCell>
                      <TableCell>
                        {chargeRow.label}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={'total-cost'}>
                      <TableCell component="th" scope="row">
                        <strong>{totalCost}</strong>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              <div className='chart-container'>
                hello
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>}
    </React.Fragment>
  );
}

interface InvoiceTableProps {
  rows: any[],
  handleEditClick: (invoice: Invoice) => void,
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ rows, handleEditClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} handleEditClick={handleEditClick} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceTable;
