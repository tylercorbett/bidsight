import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceStatuses, InvoiceBody } from '../../types/invoice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const today = dayjs().format('MM-DD-YYYY');

interface Props {
  invoice?: Invoice,
  handleChange: (invoiceBody: InvoiceBody) => void,
}

const InvoiceBaseInputFields: React.FC<Props> = ({ invoice, handleChange }) => {
  const [name, setName] = useState<string>(invoice?.name ?? '');
  const [category, setCategory] = useState<string>(invoice?.category ?? '');
  const [due_date, setDueDate] = useState<string>(invoice?.due_date ?? today);
  const [status, setStatus] = useState<string>(invoice?.status ?? InvoiceStatuses.Outstanding);

  const handleDateChange = (newDate: any) => {
    const formattedDate = newDate.format('MM/DD/YYYY');
    setDueDate(formattedDate);
  };

  useEffect(() => {
    handleChange({ 
      name,
      category,
      due_date,
      status
    })
  }, [name, category, due_date, status, handleChange]);

  return (
    <>
      <TextField 
        id="outlined-basic" 
        label="Name" 
        variant="outlined"
        value={name}
        required 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />
      <br />
      <TextField 
        id="outlined-basic" 
        label="Category" 
        variant="outlined" 
        value={category}
        required 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCategory(event.target.value);
        }}
      />
      <br />
      <DatePicker 
        label='Due date' 
        onChange={(newValue) => handleDateChange(newValue)} 
        defaultValue={dayjs(invoice?.due_date ?? dayjs(new Date()))}
      />
      <br />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={invoice?.status}
          name="radio-buttons-group"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStatus(event.target.value as InvoiceStatuses)}
        >
          <FormControlLabel value={InvoiceStatuses.Outstanding} control={<Radio />} label={InvoiceStatuses.Outstanding} />
          <FormControlLabel value={InvoiceStatuses.Paid} control={<Radio />} label={InvoiceStatuses.Paid} />
          <FormControlLabel value={InvoiceStatuses.Draft} control={<Radio />} label={InvoiceStatuses.Draft} />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default InvoiceBaseInputFields;
