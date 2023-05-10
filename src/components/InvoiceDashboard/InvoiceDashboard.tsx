import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { fetchInvoices } from '../../services/fetchInvoices';
import { Invoice } from '../../types/invoice';
import { filterInvoicesByStatuses } from '../../utils/filterInvoices';
import { replaceObjectInArray } from '../../utils/updateInvoice';
import AddInvoiceModal from '../AddInvoiceModal/AddInvoiceModal';
import EditInvoiceModal from '../EditInvoiceModal/EditInvoiceModal';
import InvoiceFilters from '../InvoiceFilters/InvoiceFilters';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import './InvoiceDashboard.css';
import Typography from '@mui/material/Typography';


const InvoiceDashboard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<boolean[]>([true, true, true, true]);
  const [selectedInvoice, setSelectedInvoice] = useState<null | Invoice>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = (invoice: Invoice) => {
    const newInvoices: Invoice[] = [invoice, ...invoices];
    setInvoices(newInvoices);
    setIsAddModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleEdit = (invoice: Invoice) => {
    const newInvoices: Invoice[] = replaceObjectInArray(invoices, invoice);
    setInvoices(newInvoices);
    setIsAddModalOpen(false);
    setSelectedInvoice(null);
  };

  const filteredInvoices = filterInvoicesByStatuses(invoices, checkedFilters);

  const handleInvoiceSelected = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <section className="InvoiceDashboard">
      <div className='title-add-button-container'>
        <h3 className='section-title'>Invoices</h3>
        <span className='add-button-container'>
          <Button variant='contained' onClick={() => setIsAddModalOpen(true)}>
            + Add new invoice
          </Button>
        </span>
      </div>
      <Typography id="status-subtitle" variant="subtitle1" align='left' component="h4">
        Statuses
      </Typography>      <InvoiceFilters 
        checkedFilters={checkedFilters}
        setCheckedFilters={setCheckedFilters}
      />
      <InvoiceTable 
        rows={filteredInvoices}
        handleEditClick={handleInvoiceSelected}
      />
      <AddInvoiceModal 
        isModalOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        handleSubmit={(invoice: Invoice) => handleAdd(invoice)}
      />
      {selectedInvoice && <EditInvoiceModal 
        isModalOpen={Boolean(selectedInvoice)}
        handleClose={() => setSelectedInvoice(null)}
        handleSubmit={(invoice: Invoice) => handleEdit(invoice)}
        invoice={selectedInvoice}
      />}
    </section>
  );
}

export default InvoiceDashboard;
