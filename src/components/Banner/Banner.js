import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../../media/dnd5elogo.png';

export default class Banner extends Component {
    render() {
        return (
            <Header>
                <Logo src={logo}/>
                <H1>Minion Manager</H1>
                <Nav>
                    <List>
                        <ListItem>Encounters</ListItem>
                        <ListItem>Bestiary</ListItem>
                        <ListItem>Simple Dice Roller</ListItem>
                    </List>
                </Nav>
            </Header>
        );
    }
}


/*
    STYLING FOR BANNER
*/

const background = '#222022';
const fontColor = '#EFEDEF';
const Header = styled.div`
    background-color: ${background};
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    padding: 0 20px; 
    color: ${fontColor};
`

const Logo = styled.img`
    max-height: 50px;
`

const H1 = styled.h1`
    font-family: fantasy, 'Montserrat', 'Open-sans', sans-serif;
    font-size: 50px;
    margin-left: 2%;
    text-shadow: 2px 2px 5px #fafafa;
`

const Nav = styled.nav`
    min-width: 400px;
`;

const List = styled.ul`
    display:flex;
    justify-content: space-around;
    align-items:center;
`;


const rotate = keyframes`
  from {
  
  }

  to {
    font-size:25px;
  }
`;

const ListItem = styled.li`
  
    :hover {
        animation: ${rotate} .1s linear forwards;
    }
`;

