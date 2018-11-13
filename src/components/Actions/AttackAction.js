import React, { Component } from 'react';
import styled from 'styled-components';
import { media, size } from '../../utils/mediaQuery';

export default class AttackAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDesc: false
        }
    }

    toggleShow = () => {
        this.setState({ showDesc: !this.state.showDesc });
    }

    render() {
        /*
            Mapping all actions into a nice list format
        */
       const { stat, action } = this.props;
       const { showDesc } = this.state;
    //    console.log(this.props);
       return action.name.toLowerCase() === 'multiattack' ?
        
            <Action key={stat.name + action.name}>
                <StyledOrder onClick={this.toggleShow}>
                    <ActionName>{ action.name }</ActionName>
                    <ShortDesc>
                        <p>If you wish to use the multi-attack option, please update the other attacks accordingly</p>
                    </ShortDesc>
                    <Description className={showDesc ? 'show' : null}>{ action.desc }</Description>
                </StyledOrder>
                
                
            </Action>
        :

            <Action key={stat.name + action.name}>
                <LeftContainer>
                    <input 
                        type='number' 
                        placeholder='0'
                        min='0'
                        onChange={ e => this.props.updateActions(e.target.value, stat.name.split(' ').join('_') + '-' + action.name, action) } 
                    />
                </LeftContainer>
                <StyledOrder onClick={this.toggleShow}>   
                    <ActionName>{ action.name }</ActionName>
                    <ShortDesc>
                        { action.attack_bonus ? <p>To-Hit: +{action.attack_bonus}</p> : null}
                        { action.damage_dice ? <p>Damage: {action.damage_dice} + {action.damage_bonus}</p> : null}
                    </ShortDesc>
                    <Description className={showDesc ? 'show' : null}>{ action.desc }</Description>
                </StyledOrder>
            </Action>
        
    }
}



/* STYLING */

const ShortDesc = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-content: center;
`;
const Description = styled.p`
    margin:0 auto;
    width: 70%;
    overflow:hidden;
    white-space: pre-wrap;
    height:fit-content;
    max-height:0;
    transition: max-height 1s ease-out;

    &.show{
        max-height: 1000px;
    }
`;

const Action = styled.div`
    text-align: center;
    width: 96%;
    display:flex;
    justify-content:space-between;
    align-items:center;
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
        margin: 10px 0;
        width: 40px;
        height: 40px;
        font-size: 25px;
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
    font-size: 25px;
    margin-left: 20px;
`;