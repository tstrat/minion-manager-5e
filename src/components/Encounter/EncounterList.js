import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateEncounterId } from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

class EncounterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounters: [],
            addEncounter: false
        }
    }

    componentDidMount() {
        axios.get('/api/encounters').then(res => {
            this.setState({ encounters: res.data });
        });
    }
    render() {

        const display = this.state.encounters.map((encounter, i) => {
            
            return (
                <Link key={encounter.id} to='/encounter' onClick={()=>this.props.updateEncounterId(encounter.id)}>
                    <ListItem>{encounter.name}</ListItem>
                </Link>
            )
        });
        return (
            <EncounterListContainer>
                <Title>Encounters</Title>
                <StyledUl>
                {display}
                </StyledUl>
                <StyledButton> Add Encounter </StyledButton>
            </EncounterListContainer>
        );
    }
}

export default connect(null, { updateEncounterId })(EncounterList);

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

const StyledButton = styled.button`
    font-size: 20px;
    margin: 20px auto;
    background-color: #efefef;
`;