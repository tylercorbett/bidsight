import { Button } from '@mui/material';
import React, { useState } from 'react';
import InvoiceFilters from '../InvoiceFilters/InvoiceFilters';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import './InvoiceDashboard.css';

const InvoiceDashboard: React.FC = () => {
  return (
    <section className="InvoiceDashboard">
      <div className='title-add-button-container'>
        <h3 className='section-title'>Invoices</h3>
        <span className='add-button-container'>
          <Button variant='contained'>+ Add new invoice</Button>
        </span>
      </div>
      <InvoiceFilters />
      <section className='table-container'>
        <InvoiceTable />
      </section>
    </section>
  );
}

export default InvoiceDashboard;
