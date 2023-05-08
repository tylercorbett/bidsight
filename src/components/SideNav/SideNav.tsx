import React from 'react';
import './SideNav.css';
import { MdDashboard as DashboardIcon } from 'react-icons/md';
import { BsChevronRight as ChevronRight, BsBookHalf as Book } from 'react-icons/bs';
import { AiFillPieChart as Chart, AiOutlineOrderedList as List } from 'react-icons/ai';

const SideNav = () => {
  return (
    <nav className="SideNav">
      <h1>BidSight</h1>
      <div className='dashboard-container active'>
        <DashboardIcon className='nav-icon'/>
        <h2 className='nav-label'>Dashboard</h2>
      </div>
      <div className='nav-section'>
        <p className='nav-section-label'>COMPONENTS</p>
        <div className='dashboard-container spread-items'>
          <span className='align-horizontal'>
            <Chart className='nav-icon'/>
            <h2 className='nav-label'>Charts</h2>
          </span>
          <ChevronRight />
        </div>
        <div className='dashboard-container spread-items'>
          <span className='align-horizontal'>
            <List className='nav-icon'/>
            <h2 className='nav-label'>Utilities</h2>
          </span>
          <ChevronRight />
        </div>
        <div className='dashboard-container spread-items'>
          <span className='align-horizontal'>
            <Book className='nav-icon'/>
            <h2 className='nav-label'>Documentation</h2>
          </span>
          <ChevronRight />
        </div>
      </div>
    </nav>
  );
}

export default SideNav;
