import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import { media } from './utils/mediaQuery';

import Bestiary from './components/Bestiary/Bestiary';
import EncounterManager from './components/Encounter/EncounterManager';
import Banner from './components/Banner/Banner';

class App extends Component {
  render() {
    return (
      <Container>
        <Banner />
        <EncounterManager/>
        {/* <Bestiary /> */}
      </Container>
    );
  }
}

export default App;

const Container = styled.div`

  margin: 0 auto;
  border: 1px solid #222022;
  width: 100%;
  position:relative;
  ${media.invertPhone`
    max-width: 1024px;
  `};
  
`;