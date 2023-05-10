import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Invoice } from '../../types/invoice';
import { filterInvoicesByStatuses } from '../../utils/filterInvoices';
import AddInvoiceModal from '../AddInvoiceModal/AddInvoiceModal';
import InvoiceFilters from '../InvoiceFilters/InvoiceFilters';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import './InvoiceDashboard.css';

export function createData(
  name: string,
  status: string,
  category: string,
  dueDate: string,
  id: number,
) {
  return {
    name,
    status,
    category,
    dueDate,
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<Invoice[]>(rows);
  const [checkedFilters, setCheckedFilters] = useState<boolean[]>([true, true, true, true]);
  const [selectedInvoice, setSelectedInvoice] = useState<null | number>(null);

  const handleSubmit = (invoice: Invoice) => {
    const newInvoices: Invoice[] = [invoice, ...invoices];
    setInvoices(newInvoices);
    setIsModalOpen(false);
  };

  const filteredInvoices = filterInvoicesByStatuses(invoices, checkedFilters);

  const handleInvoiceSelected = (id: number) => {
    setSelectedInvoice(id);
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
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSubmit={(invoice: Invoice) => handleSubmit(invoice)}
      />
    </section>
  );
}

export default InvoiceDashboard;
