import React from 'react';
import './SideNav.css';
import { MdDashboard as DashboardIcon } from 'react-icons/md';

const SideNav = () => {
  return (
    <nav className="SideNav">
      <h1>BidSight</h1>
      <div className='dashboard-container'>
        <DashboardIcon className='nav-icon'/>
        <h2 className='nav-label'>Dashboard</h2>
      </div>
    </nav>
  );
}

export default SideNav;
