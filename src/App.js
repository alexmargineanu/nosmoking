import React from 'react';
import './App.css';
import Count from './hooks/Count';
import confetti  from 'canvas-confetti';
import Settings  from './Settings';

function getNumberOfDays(sinceDate) {
  const since = new Date(sinceDate);
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = today.getTime() - since.getTime();
  return Math.round(diffInTime / oneDay);
}


function App() {
  const savedDate = localStorage.getItem("date");
  const savedPacks = localStorage.getItem("packs");
  const savedPrice = localStorage.getItem("price");
  if(savedDate && JSON.parse(savedDate) !== "") {
    const numberOfDays = getNumberOfDays(JSON.parse(savedDate));
    const packs = Math.round((numberOfDays / 7) * JSON.parse(savedPacks));
    const pricePerPack = JSON.parse(savedPrice);
    const tobacoMoney = Math.round(packs * pricePerPack);

    confetti({
      particleCount: 300,
      spread: 100,
      origin: { y: 0.6 }
    });

    return (
      <div className="App">
        <Settings />
        <header className="App-header">
          <h1><Count number={numberOfDays} /> days smoke free</h1>
          <h2>
            saved {tobacoMoney} RON by not smoking {packs} packs
          </h2>
          
        </header>
      </div>
    );

  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Settings />
        </header>
      </div>
    )
  }
  
  
}

export default App;
