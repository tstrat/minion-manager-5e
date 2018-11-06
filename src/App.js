import React, { Component } from 'react';
import './App.css';

// import Bestiary from './components/Bestiary/Bestiary';
import EncounterManager from './components/Encounter/EncounterManager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EncounterManager/>
      </div>
    );
  }
}

export default App;
