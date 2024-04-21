import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Weather from './weather';

function App() {
  return (
    <div className="container-fluid">
      <header className="bg-primary text-white text-center p-4">
        <h1 className="display-4">Weather App</h1>
      </header>
      <main className="p-4">
        <Weather />
      </main>
    </div>
  );
}

export default App;
