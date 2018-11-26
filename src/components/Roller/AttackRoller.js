import React, { Component } from 'react';
import { d20Rolls, dieRoller, splitDiceRollString } from '3dr';
import styled from 'styled-components';
import { size, media } from '../../utils/mediaQuery';

export default class AttackRoller extends Component {
    constructor() {
        super();
        this.state = {
            rolls: {
                //  attackName : { to-hit: d20rolls, damage: dieRoller }
                //  if not an attack to hit use null for sanity checks
            }
        }
    }

    componentDidMount() {
        const { actions } = this.props;
        const { rolls } = this.state;
        for (let key in actions) {
            const monsterType = this.getMonsterType(key);
            for( let i = 0; i < actions[key].count; i++) {
                let toHit, damage;
                if (actions[key].attack_bonus) {
                    toHit = d20Rolls(actions[key].attack_bonus);
                }
                if ( actions[key].damage_dice) { 
                    let r = splitDiceRollString(actions[key].damage_dice).map(n => parseInt(n));
                    // rolls[key][damage] = dieRoller()
                    damage = dieRoller(...r, actions[key].damage_bonus || 0);
                }

                const newRoll = { 'to_hit': toHit || null, damage, desc: actions[key].desc, name: this.getAttackType(key) };
                if ( monsterType in rolls ) {
                    rolls[monsterType].push(newRoll);
                } else {
                    rolls[monsterType] = [ newRoll ];
                }
            }
            
        }

        this.setState({
            rolls
        })
    }

    getMonsterType = (str) => {
        return str.split('-')[0].replace(/_/gi, ' ');
    }
    
    getAttackType = (str) => {
        return str.slice(str.indexOf('-') + 1).replace(/_/gi, ' ');
    }

    
    render() {
        const { rolls } = this.state;
        if (!Object.keys(rolls).length) {
            return <div>Loading..</div>
        }
        const rollDisplay = [];
        for ( let key in rolls ) {
            
            const next = rolls[key];
            
            const innerDisplay = [];
            next.forEach((roll, i) => {
                let toHit = null, damage = null;
                console.log('roll',roll);
                if (roll.to_hit) {
                    toHit = 
                        <Table>
                            <p>To-Hit:</p>
                            <p className='roll'>{ roll.to_hit[0][0] }</p>
                            <p className='mod'>{ roll.to_hit[1] }</p>
                            <p className='total'>{ roll.to_hit[2][0] }</p>
                        </Table>;
                }
                if (roll.damage) {
                    damage = 
                        <Table>
                            <p>Damage:</p>
                            <p className='roll'>{ roll.damage[0].join(', ') }</p>
                            <p className='mod'>{ roll.damage[1] }</p>
                            <p className='total'>{ roll.damage[2] }</p>
                        </Table>
                }
            
                /* TO-DO: STYLING */
                innerDisplay.push(
                    <Roll key={roll+i} className='roll'>
                        <h3>{roll.name}</h3>
                        { toHit }
                        { damage }
                        { !toHit ? <p className='desc'>{ roll.desc }</p> : null }
                    </Roll>
                );
            })
            rollDisplay.push(
                <AttackGroup key={key}>
                    
                    <Table>
                        <h1>{key}</h1>
                        <p>Roll <D20 className="fas fa-dice-d20"/></p>
                        <p>Mod ( + )</p>
                        <p>Total</p>
                    </Table>
                    <Bar />
                    { innerDisplay }
                </AttackGroup>
            );
        }
        
        return (
            <AttackRollsContainer className='attack-rolls'>
                { rollDisplay }
            </AttackRollsContainer>
        );
    }
}


const AttackRollsContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: flex-start;
    width:100%;
`;
const AttackGroup = styled.div`
    width: 100%;
`;

const D20 = styled.i`
    font-size: 20px;
`;
const Bar = styled.div`
    width: 90%;
    margin: 10px auto;
    border-top: 5px solid transparent;
    border-left: ${`${size.tablet * .8 *.9}px`} solid #EC2127; 
    border-bottom: 5px solid transparent;

    ${media.phone`
        border-left: ${`${size.phone * .8 *.9}px`} solid #EC2127; 
    `}
`;
const Roll = styled.div`
    width: 90%;
    margin: 10px auto;
    border: 1px solid black;
    
    & h3 {
        width: 90%;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        margin: 15px auto;
        color: #b52020;
    }
    & .desc {
        padding: 0 20px;
        max-height: 150px;
        overflow-y: scroll;
        margin: 15px 0;
    }
`;

const Table = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    text-align: center;
    & > * {
        width: 100%;
        min-width: fit-content;
    }

    & h1 {
        font-size: 35px;
    }
`;