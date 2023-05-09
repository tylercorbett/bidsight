import React from 'react';
import InvoiceDashboard from '../InvoiceDashboard/InvoiceDashboard';
import SideNav from '../SideNav/SideNav';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <SideNav />
      <section>
        <header>
          <p>
            Hi <strong>Tyler Corbett</strong>
          </p>
          <div className='avatar-container'>
            <img 
              className='avatar'
              alt='Avatar'
              src="https://res.cloudinary.com/dmtn5fbdu/image/upload/v1552429348/samples/people/smiling-man.jpg"
            />
          </div>
        </header>
        <InvoiceDashboard />
      </section>
    </div>
  );
}

export default App;
