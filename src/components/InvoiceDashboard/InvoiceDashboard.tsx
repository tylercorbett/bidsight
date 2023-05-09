import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Invoice } from '../../types/invoice';
import AddInvoiceModal from '../AddInvoiceModal/AddInvoiceModal';
import InvoiceFilters from '../InvoiceFilters/InvoiceFilters';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import './InvoiceDashboard.css';

const InvoiceDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [invoices, setInvoices] = useState([]);

  const handleSubmit = (invoice: Invoice) => {
    console.log('invoice submitted with ', invoice);
    setIsModalOpen(false);
  };

  return (
    <section className="InvoiceDashboard">
      <div className='title-add-button-container'>
        <h3 className='section-title'>Invoices</h3>
        <span className='add-button-container'>
          <Button variant='contained' onClick={() => setIsModalOpen(true)}>
            + Add new invoice
          </Button>
        </span>
      </div>
      <InvoiceFilters />
      <section className='table-container'>
        <InvoiceTable 
          // invoices={invoices}
        />
      </section>
      <AddInvoiceModal 
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSubmit={(invoice: Invoice) => handleSubmit(invoice)}
      />
    </section>
  );
}

export default InvoiceDashboard;
