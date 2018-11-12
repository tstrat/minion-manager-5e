import React, { Component } from 'react';
import styled from 'styled-components';

export default class Checkbox extends Component {
    constructor() {
        super();
        this.state = { check : false }
    }

    select = (checked) => {
        this.setState({ check : checked})
        this.props.selectFn(checked, this.props.monster);
    } 

    render() {
        const { check } = this.state;
        
        return (
            <StyledCheck onClick={() => this.select(!check)} className={ check }>
                { check ? <i class="far fa-check-square"></i> : <i class="far fa-square"></i> } 
            </StyledCheck>
        );
    }
}

const StyledCheck = styled.div`
    width: 70px;
    border-left: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    & i {
        font-size: 25px;
        line-height: 50px;
        margin: 0 auto;
    }

    &.true {
        background-color: #03AC13;
        color: white;
        border-left: 2px solid gray;
    }

`;