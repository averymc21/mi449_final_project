import React from 'react';
import './App.css';
import Weather from './weather';
import './weather.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main className="App-main">
        <Weather />
      </main>
    </div>
  );
}

export default App;
