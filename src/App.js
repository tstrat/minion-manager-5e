import React, { Component } from 'react';
import './App.css';

import Bestiary from './components/Bestiary/Bestiary';
import EncounterManager from './components/Encounter/EncounterManager';
import Banner from './components/Banner/Banner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner />
        <EncounterManager/>
        {/* <Bestiary /> */}
      </div>
    );
  }
}

export default App;
