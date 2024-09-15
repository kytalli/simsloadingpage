import React from 'react';
import MemeGenerator from './memegenerator';
import './App.css'; // Make sure this import is present

function App() {
  return (
    <div className="App" style={{ padding: '10px' }}>
      <div style={{ 
        overflow: 'hidden',
        width: '100%',
        marginBottom: '10px'
      }}>
        <h1 className="scrolling-text" style={{ 
          fontFamily: 'idolwild',
          fontSize: '3rem',
          margin: 0,
          padding: '10px 0'
        }}>
          Sims Loading Page Editor  !!!!!
        </h1>
      </div>
      <MemeGenerator />
    </div>
  );
}

export default App;