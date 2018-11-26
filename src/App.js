import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import { media } from './utils/mediaQuery';
import { Switch, Route } from 'react-router-dom';

import Bestiary from './components/Bestiary/Bestiary';
import EncounterManager from './components/Encounter/EncounterManager';
import EncounterList from './components/Encounter/EncounterList';
import Banner from './components/Banner/Banner';
import Login from './components/Login/Login';

class App extends Component {

  render() {
    return (
      <Container>
        <Image src='https://triumvene.com/blog/content/images/2018/09/f54890248-1.jpg' alt='dnd phb' />
        <Banner />
        <Switch>
          <Route path='/bestiary' component={Bestiary} />
          <Route path='/encounter' component={EncounterManager} />
          <Route path='/login' component={Login} />
          <Route path='/' component={EncounterList} />
        </Switch>
      </Container>
    );
  }
}

export default (App);

const Container = styled.div`
  background-color: white;
  margin: 0 auto;
  border: 1px solid #222022;
  width: 100%;
  position:relative;
  max-width: 1024px;
  min-height: 100vh;
  ${media.phone`
    max-width: 100vw
  `};
  
`;

const Image = styled.div`
  background-color: black;
  background-image: url('https://triumvene.com/blog/content/images/2018/09/f54890248-1.jpg');
  background-size: cover;
  background-repeat: none;
  position:fixed;
  top:0;
  left:0;
  height: 100vh;
  width: 100vw;
  z-index:-2;
`;