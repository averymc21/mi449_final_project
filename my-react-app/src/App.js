import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './weather';

function App() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <header className="bg-primary text-white text-center p-4 w-100">
        <h1 className="display-4">WeatherWise</h1>
        <img 
              src="/logo.png" 
              alt="Weather Icon" 
              className="mb-3" 
              style={{ width: '25px', height: 'auto' }} 
          />
        <h2>Your Local Weather Forecast</h2>
      </header>
      <main className="p-4 d-flex flex-column align-items-center">
        <Weather />
      </main>
    </div>
  );
}

export default App;
