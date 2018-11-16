import React, { Component } from 'react';
// import axios from 'axios';
import Encounter from './Encounter';
import styled from 'styled-components';
import { connect } from 'react-redux';


class EncounterManager extends Component {

    render() {
        return (
            <Container>
                <h1>Encounter : {this.props.encounterId}</h1>
                <Encounter id={this.props.encounterId} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        encounterId: state.encounterId,
    }
}

export default connect(mapStateToProps)(EncounterManager);

/* 
    STYLING 
*/

const Container = styled.div`
    width: 100%;
`;