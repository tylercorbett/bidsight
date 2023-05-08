import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <p>
          Hi <strong>Tyler Corbett</strong>
        </p>
        <div className='avatar-container'>
          <img 
            className='avatar'
            src="https://res.cloudinary.com/dmtn5fbdu/image/upload/v1552429348/samples/people/smiling-man.jpg"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
