import React, { Component } from 'react';
import styled from 'styled-components';

export default class Checkbox extends Component {
    constructor() {
        super();
        this.state = { check : false }
    }

    select = (checked) => {
        this.props.selectFn(checked, this.props.monster);
        this.setState({ check: checked })
    } 

    componentWillUnmount() {
        this.setState({ check: false });
    }
    render() {
        const { check } = this.state;
        
        return (
            <StyledCheckbox onClick={() => this.select(!check)} className={ check }>
                { check ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i> } 
            </StyledCheckbox>
        );
    }
}

const StyledCheckbox = styled.div`
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