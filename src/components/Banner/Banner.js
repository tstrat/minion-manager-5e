import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../utils/mediaQuery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../ducks/reducer';
import axios from 'axios';

class Banner extends Component {
    constructor() {
        super();
        this.state={
            show: ''
        }
    }

    toggleShow = () => this.setState({ show: !this.state.show.length ? 'show' : '' });

    logout = () => {
        axios.post('/auth/logout')
        .then( () => {
            this.props.logout();
            this.setState({ show: '' });
        });
    }
    render() {
        return (
            <Header>
                <InnerBox>
                    <Logo className='fab fa-d-and-d' />
                    <H1 className={navigator.platform.indexOf('Mac') > -1 ? null: 'win'}>Minion Manager</H1>
                </InnerBox>
                <Menu className={ 'fas fa-bars' } onClick={ this.toggleShow }/>
                <Nav className={this.state.show ? 'show' : ''}>
                    <List className={this.state.show ? 'boom' : ''}>
                        
                        <ListItem onClick={this.toggleShow}><Link to='/'>Encounters</Link></ListItem>
                        <ListItem onClick={this.toggleShow}><Link to='/bestiary'>Bestiary</Link></ListItem>
                        <ListItem className="disabled" onClick={this.toggleShow}>Simple Dice Roller</ListItem>
                        <ListItem onClick={this.toggleShow}>
                            { this.props.user.id 
                                ? 
                                <button onClick={this.logout}>Logout</button>
                                : <Link to='/login'><button>Login</button></Link>
                            }
                        </ListItem>
                    </List>
                </Nav>
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout })(Banner);
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
    display: block;
    
    ${ media.tablet`
        position:fixed;
        top:100px;
        left:0;
        width:100%;
        height:0;
       
        &.show {
            height: 100vh;
        }
    `}

    
`;

const Menu = styled.i`
    display:none;
    
    ${ media.tablet`
        display:block;
        font-size: 40px;
        margin-right: 20px;
    `}
`;

const List = styled.ul`
    
    ${ media.tablet`
        height: 0; /* 100% Full-height */
        width: 100%; /* 0 width - change this with JavaScript */
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        left: 0;
        background-color: #111; /* Black*/
        overflow-y: hidden; /* Disable horizontal scroll */
        transform: height;
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
        margin-right:0;
        flex-direction: column;
        justify-content: flex-start;
        &.boom {
            height: 100vw;
        }
    `}

    display:flex;
    justify-content: space-around;
    align-items:center;
    position: static;
    margin-right: 15px;
`;

const ListItem = styled.li`
    margin-left: 15px;
    text-decoration: none;
    font-size: 20px;
    
    & a {
        color: ${ fontColor };
        text-decoration: none;
    }
    
    :hover {
        text-decoration: underline;
    }

    ${ media.tablet`
        margin: 20px 0;
    `}

    &.disabled{
        cursor: no-drop;
        text-decoration: line-through;
    }
`;

