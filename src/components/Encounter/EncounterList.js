import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateEncounter, updateUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

class EncounterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounters: [],
            addEncounter: false,
            input: '',
            loggedIn: false
        }
    }

    componentDidMount() {
        this.fetchData();
        axios.get('/api/encounters').then(res => {
            this.setState({ encounters: res.data });
        });
    }

    toggleAdd = () => {
        this.setState({ 
            addEncounter : !this.state.addEncounter,
            input: ''
        });
    }

    fetchData = async () => {
        axios.get('/auth/get-session')
        .then(res => {
            if (res.data) {
                this.props.updateUser(res.data);
                this.setState({ loggedIn: true });
                axios.get('/api/encounters').then(res => {
                    this.setState({ encounters: res.data });
                });
            }
        })
        
    }

    addNewEncounter = async () => {
        const name = this.state.input;
        const user = this.props.user;

        axios.post('/api/encounters', { name, userId: user.id })
        .then( res => {
            console.log('Added encounter', res);
            const appended = this.state.encounters.slice();
            appended.push(res.data);
            this.setState({ encounters: appended });
        })
        this.toggleAdd();
    }

    render() {
        if (! this.state.loggedIn ) {
            return <div>
                Please Login:
                <Link to='/login'><button>Login</button></Link>
            </div>
        }
        console.log(this.props);
        const display = this.state.encounters.map((encounter, i) => {
        
            return (
                <Link key={encounter.id} to='/encounter' onClick={()=>this.props.updateEncounter(encounter)}>
                    <ListItem>{i+1}. {encounter.name}</ListItem>
                </Link>
            )
        });
        if (this.state.addEncounter) {
            return (
                <EncounterListContainer>
                    <input value={this.state.input} onChange={e => this.setState({ input : e.target.value })}></input>
                    <StyledButtonContainer>
                        <StyledButton onClick={this.toggleAdd}>Cancel</StyledButton>
                        <StyledButton onClick={this.addNewEncounter}>Add</StyledButton>
                    </StyledButtonContainer>
                </EncounterListContainer>
            )
        }
        return (
            <EncounterListContainer>
                <Title>Encounters</Title>
                <StyledUl>
                    {display}
                </StyledUl>
                <StyledButton onClick={this.toggleAdd}> Add Encounter </StyledButton>
            </EncounterListContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { updateEncounter, updateUser })(EncounterList);

const EncounterListContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;

`;

const Title = styled.h1`
    font-weight: 600;
    font-variant: small-caps;
    font-style: oblique;
    width: 100%;
    font-size: 30px;
    align-self: flex-start;
    margin: 20px 30px;
`;
const StyledUl = styled.ul`
    margin: 0 auto;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 80%;
    /* background-color: #220222; */
    & a {
        background-color: white;
        width: 80%;
        text-decoration: none;
        color: black;
        
        
        display:flex;
        justify-content:space-evenly;
        align-items: center;
        margin: 10px 10px;
    }
`;
const ListItem = styled.li`
    padding: 0 10px;
    list-style: none;
    width: 100%;
    border: 2px solid black;
    font-size: 22px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    box-shadow: 1px 1px 5px #220222;
    line-height: 50px;
    
`;

const StyledButtonContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledButton = styled.button`
    font-size: 20px;
    margin: 20px auto;
    background-color: #efefef;
`;