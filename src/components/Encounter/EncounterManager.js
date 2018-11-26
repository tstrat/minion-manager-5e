import React, { Component } from 'react';
// import axios from 'axios';
import Encounter from './Encounter';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class EncounterManager extends Component {

    render() {
        if (!this.props.encounter.id) {
           return <Redirect to='/'/>
        }
        return (
            <Container>
                <h1>Encounter : {this.props.encounter.name}</h1>
                <Encounter id={this.props.encounter.id} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        encounter: state.encounter,
    }
}

export default connect(mapStateToProps)(EncounterManager);

/* 
    STYLING 
*/

const Container = styled.div`
    width: 100%;
`;