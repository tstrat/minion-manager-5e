import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../utils/mediaQuery';

export default class AttackAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDesc: false,
        }
    }

    toggleShow = () => {
        this.setState({ showDesc: !this.state.showDesc });
    }

    updateAction = (count, key, action) => {
        if (count == ''){
            count = 0;
        }
        var parsed = parseInt(count, 10);
        if (isNaN(parsed)) { return }
        else {
            this.props.updateActions(parsed, key, action);
        }
    }
    
    render() {
        /*
            Mapping all actions into a nice list format
        */
       const { stat, action } = this.props;
       const { showDesc } = this.state;
       return action.name.toLowerCase() === 'multiattack' ?
        
            <Action key={stat.name + action.name}>
                <StyledOrder onClick={this.toggleShow}>
                    <ActionName className='action-name'>{ action.name }</ActionName>
                    <ShortDesc>
                        <p>If you wish to use the multi-attack option, please update the other attacks accordingly</p>
                    </ShortDesc>
                    <Description className={showDesc ? 'show' : null}>{ action.desc }</Description>
                </StyledOrder>
                
                
            </Action>
        :

            <Action key={stat.name + action.name}>
                <LeftContainer>
                    <label>
                    <input 
                        input='number' 
                        placeholder='0'
                        min='0'
                        onChange={ e => this.updateAction(e.target.value, stat.name.split(' ').join('_') + '-' + action.name, action) } 
                    />
                    </label>
                </LeftContainer>
                <StyledOrder onClick={this.toggleShow}>   
                    <ActionName className='action-name'>{ action.name }</ActionName>
                    <ShortDesc>
                        { action.attack_bonus ? <p>To-Hit: +{action.attack_bonus}</p> : null}
                        { action.damage_dice ? <p>Damage: {action.damage_dice} {action.damage_bonus ? `+ ${action.damage_bonus}` : null}</p> : null}
                    </ShortDesc>
                    <Description className={showDesc ? 'show' : null}>{ action.desc }</Description>
                </StyledOrder>
                <Arrow className={showDesc ? 'arrow-up' : 'arrow-down'}/>
            </Action>
        
    }
}



/* STYLING */
const actionHeight = 50;

const ShortDesc = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-content: center;
    & > * {
        margin: 10px;
    }
`;
const Description = styled.p`
    width: 80%;
    overflow:hidden;
    white-space: pre-wrap;
    height: fit-content;
    max-height:0;
    transition: max-height 0.4s ease-in;
    margin: 15px;
    
    &.show{
        max-height: ${`${actionHeight * 3}px`};
        overflow-y: scroll;
        padding: 5px;
    }
    
`;

const Action = styled.div`
    position: relative;
    text-align: center;
    width: 96%;
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    border: 1px solid black;
    padding: 10px;
`;

const LeftContainer = styled.div`
    align-self: left;
    width: fit-content;
    max-width: 50%;
    min-width: 50px;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input {
        margin: 10px 10px;
        width: 45px;
        height: 45px;
        font-size: 25px;
        text-align:center;
        border: 1px solid black;
    }
`;

const StyledOrder = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;
const ActionName = styled.h3`
    &.action-name{
        font-size: 20px;
        font-weight: 600;
        margin-left: 0;
        align-self: auto;
    }
`;

const Arrow = styled.div`
    /* margin-left: auto; */
    position: absolute;
    bottom: 15px;
    right: 10px;
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    margin: 0 10px;
    transition: transform .5s;
    &.arrow-up {
        transform: rotate(45deg) scale(-1,1);
    }
    &.arrow-down {
        transform: rotate(135deg);
    } 
`;
