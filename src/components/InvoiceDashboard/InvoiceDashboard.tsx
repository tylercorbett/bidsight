import React from 'react';
import './InvoiceDashboard.css';

const InvoiceDashboard: React.FC = () => {
  return (
    <section className="InvoiceDashboard">
      <h3 className='section-title'>Invoices</h3>
      <div className='filters'>
        <button className='filter active-filter'>
          All
        </button>
        <button className='filter'>
          Due
        </button>
        <button className='filter'>
          Paid
        </button>
        <button className='filter'>
          Unpaid
        </button>
        <button className='filter'>
          Late
        </button>
      </div>
    </section>
  );
}

export default InvoiceDashboard;
