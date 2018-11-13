import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '../../utils/mediaQuery';

export default class Banner extends Component {
    constructor() {
        super();
        this.state={
            show: ''
        }
    }

    toggleShow = () => this.setState({ show: !this.state.show.length ? 'show' : '' });

    render() {
        // const { show } = this.state;
        // const showStyle = show.length ? { width: '400px' } : {};
        // const displayNav = show.length ? { display: 'block' } : {};
        // const smallWindow = show.length ? <ListItem className="fas fa-times" onClick={ this.toggleShow } /> : null;
        return (
            <Header>
                <InnerBox>
                    <Logo className='fab fa-d-and-d' />
                    <H1 className={navigator.platform.indexOf('Win') > -1 ? 'win': null}>Minion Manager</H1>
                </InnerBox>
                <Menu className={ 'fas fa-bars' } onClick={ this.toggleShow }/>
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

const Logo = styled.i`
    font-size: 50px;
    color: #EC2127;
`

const InnerBox = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const H1 = styled.h1`
    font-family: fantasy, 'Montserrat', 'Open-sans', sans-serif;
    white-space: nowrap;
    font-size: 30px;
    text-align: center;
    margin-left: 20px;
    text-shadow: 2px 2px 5px #fafafa;

    ${ media.tablet`
        text-align: left;
    `}
    &.win {
        font-family: 'Montserrat', 'Open-sans', sans-serif;

    }
`

const Nav = styled.nav`
    min-width: 400px;
    display: block;
    ${ media.phone`
        display:none;
    `}
`;

const Menu = styled.i`
    display:none;
    font-size: 40px;
    margin-right: 20px;
    ${ media.phone`
        display:block;
    `}
`;

const List = styled.ul`
    
    ${ media.phone`
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
    `}
    
    
    
        display:flex;
        justify-content: space-around;
        align-items:center;
        position: static;
    
`;



const ListItem = styled.li`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: ${ fontColor };
    
    :hover {
        text-decoration: underline;
    }
`;

