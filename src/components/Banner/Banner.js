import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../../media/dnd5elogo.png';


export default class Banner extends Component {
    constructor() {
        super();
        this.state={
            show: ''
        }
    }

    toggleShow = () => this.setState({ show: !this.state.show.length ? 'show' : '' });

    render() {
        const { show } = this.state;
        const showStyle = show.length ? { width: '400px' } : {};
        const displayNav = show.length ? { display: 'block' } : {};
        const smallWindow = show.length ? <ListItem className="fas fa-times" onClick={ this.toggleShow } /> : null;
        return (
            <Header>
                <InnerBox>
                    <Logo src={ logo }/>
                    <H1>Minion Manager</H1>
                </InnerBox>
                <Menu className={ 'fas fa-bars' } onClick={ this.toggleShow }/>
                <Nav style={ displayNav }>
                    <List style={ showStyle }>
                        { smallWindow }
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
    background-color: ${ background };
    width: 100%;
    color: ${ fontColor };
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    color: ${fontColor};
    position: relative;
`

const Logo = styled.img`
    max-height: 50px;
`

const InnerBox = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
`;

const H1 = styled.h1`
    font-family: fantasy, 'Montserrat', 'Open-sans', sans-serif;
    /* width: 80%; */
    font-size: 30px;
    text-align: center;
    margin-left: 2%;
    text-shadow: 2px 2px 5px #fafafa;

    @media screen and ( min-width: 768px ) {
        text-align: left;
    }
`

const Nav = styled.nav`
    display:none;

    @media screen and (min-width: 768px ) {
        min-width: 400px;
        display: block;
    }
`;

const Menu = styled.i`
    font-size: 40px;
    margin-right: 20px;
    @media screen and (min-width: 768px ) {
        display:none;
    }
`;

const List = styled.ul`
    
    @media screen and (max-width: 767px) {
        height: 100%; /* 100% Full-height */
        width: 0; /* 0 width - change this with JavaScript */
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        right: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }
    
    
    @media screen and ( min-width: 768px ) {
        display:flex;
        justify-content: space-around;
        align-items:center;
        position: static;
        
    }
`;



const ListItem = styled.li`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: ${ fontColor };
    display: block;
    :hover {
        text-decoration: underline;
    }
`;

