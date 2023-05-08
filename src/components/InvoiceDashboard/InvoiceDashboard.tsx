import React, { useState } from 'react';
import './InvoiceDashboard.css';

const InvoiceDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <section className="InvoiceDashboard">
      <h3 className='section-title'>Invoices</h3>
      <div className='filters'>
        <button className='filter active-filter' onClick={() => setActiveFilter('all')}>
          All
        </button>
        <button className='filter' onClick={() => setActiveFilter('due')}>
          Due
        </button>
        <button className='filter' onClick={() => setActiveFilter('paid')}>
          Paid
        </button>
        <button className='filter' onClick={() => setActiveFilter('unpaid')}>
          Unpaid
        </button>
        <button className='filter' onClick={() => setActiveFilter('late')}>
          Late
        </button>
      </div>
    </section>
  );
}

export default InvoiceDashboard;
