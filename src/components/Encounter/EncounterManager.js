import React, { Component } from 'react';
// import axios from 'axios';
import Encounter from './Encounter';
import styled from 'styled-components';


export default class EncounterManager extends Component {
    constructor() {
        super();
        this.state = {
            encounterId: 1,
        }
    }

    render() {
        const { encounterId } = this.state;
        return (
            <Container>
                <h1>Encounter 1</h1>
                <Encounter id={ encounterId } />
            </Container>
        );
    }
}


const Container = styled.div`
    width: 100%;
`;