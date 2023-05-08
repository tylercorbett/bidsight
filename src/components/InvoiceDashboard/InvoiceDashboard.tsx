import React, { useState } from 'react';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import './InvoiceDashboard.css';

const defaultFilterClass = 'filter';
const activeFilterClass = defaultFilterClass + ' active-filter';

const InvoiceDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleClick = (buttonId: string) => {
    setActiveFilter(buttonId);
  };

  return (
    <section className="InvoiceDashboard">
      <h3 className='section-title'>Invoices</h3>
      <div className='filters'>
        <button className={activeFilter === 'all' ? activeFilterClass : defaultFilterClass} onClick={() => handleClick('all')}>
          All
        </button>
        <button className={activeFilter === 'due' ? activeFilterClass : defaultFilterClass} onClick={() => handleClick('due')}>
          Due
        </button>
        <button className={activeFilter === 'paid' ? activeFilterClass : defaultFilterClass} onClick={() => handleClick('paid')}>
          Paid
        </button>
        <button className={activeFilter === 'unpaid' ? activeFilterClass : defaultFilterClass} onClick={() => handleClick('unpaid')}>
          Unpaid
        </button>
        <button className={activeFilter === 'late' ? activeFilterClass : defaultFilterClass} onClick={() => handleClick('late')}>
          Late
        </button>
      </div>
      <section className='table-container'>
        <InvoiceTable />
      </section>
    </section>
  );
}

export default InvoiceDashboard;
