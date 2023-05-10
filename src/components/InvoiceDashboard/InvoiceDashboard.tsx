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

export function createData(
  name: string,
  status: string,
  category: string,
  due_date: string,
  id: number,
) {
  return {
    name,
    status,
    category,
    due_date,
    id,
    charges: [
      {
        label: 'Drywall installation',
        cost: '2800.00'
      },
      {
        label: 'Carpentry work:',
        cost: '1650.00'
      },
      {
        label: 'Lumber wood 2x4',
        cost: '1200.00'
      },
    ],
  };
}

const rows = [
  createData('Glass Facade', 'Paid', 'New Construction', '11/15/2022', 1),
  createData('Water Damage Repair', 'Draft', 'Painting', '12/08/2022', 2),
  createData('Window Replacement', 'Outstanding', 'Repairs', '01/25/2024', 3),
  createData('Kitchen Renovation', 'Outstanding', 'Renovations', '04/25/2023', 4),
  createData('HVAC Replacement', 'Outstanding', 'Repairs', '06/05/2022', 5),
  createData('Paint Siding', 'Paid', 'Painting', '01/05/2023', 6),
  createData('Loft Renovation', 'Draft', 'Renovations', '06/07/2023', 7),
  createData('Fix sinkt', 'Paid', 'Repairs', '03/05/2023', 8),
  createData('Fix door', 'Paid', 'Repairs', '09/12/2023', 9),
];


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
      <InvoiceFilters 
        checkedFilters={checkedFilters}
        setCheckedFilters={setCheckedFilters}
      />
      <section className='table-container'>
        <InvoiceTable 
          rows={filteredInvoices}
          handleEditClick={handleInvoiceSelected}
        />
      </section>
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
