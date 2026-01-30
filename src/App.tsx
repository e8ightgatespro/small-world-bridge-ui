import { useEffect, useState } from 'react';
import './App.scss';
import DecklistContainer from './Containers/DecklistContainer';
import { Card } from './Models/Card';
import { DisplayBridges } from './Components/DisplayBridges/DisplayBridges';

function App() {
  const [deck, setDeck] = useState<Card[]>(() => {
    const savedDeck = sessionStorage.getItem('deck');
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);


  return (
    <div style={{overflow: "hidden", height: "100vh"}}>
      <header className="App-header">SMALL WORLD BRIDGES</header>
      <div className="App">
          <DecklistContainer deck={deck} setDeck={setDeck} />
          <DisplayBridges deck={deck} /> 
      </div>
    </div>
  );
}

export default App;
