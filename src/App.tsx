import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  async function fetchData() {
   const response = await fetch('/bridge/getBridgesInDeck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        name: 'Effect Veiler',
        race: 'Spellcaster',
        attribute: 'LIGHT',
        level: 1,
        atk: 0,
        def: 0,
      },
      {
        name: 'Blue-Eyes White Dragon',
        race: 'Dragon',
        attribute: 'LIGHT',
        level: 8,
        atk: 3000,
        def: 2500,
      }
    ]),
    });
    return await response.json();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => fetchData()}>Fetch Data</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
