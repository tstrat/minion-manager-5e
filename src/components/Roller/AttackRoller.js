import React, { Component } from 'react';
import { d20Rolls, dieRoller, splitDiceRollString } from '3dr';

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
            console.log('MonsterType:', key);
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
                    console.log(damage);
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
        console.log( rolls);
        const rollDisplay = [];
        for ( let key in rolls ) {
            let toHit = null, damage = null;
            const next = rolls[key];
            console.log('NEXT:', next);
            
            const innerDisplay = [];
            next.forEach((roll, i) => {
                console.log(roll);
                console.log(`KEY: ${key}, ROLL: ${roll.to_hit}`);
                if (roll.to_hit) {
                    toHit = <p>To-Hit: ( { roll.to_hit[0][0] } ) + { roll.to_hit[1] } = { roll.to_hit[2][0] }</p>;
                }
                if (roll.damage) {
                    damage = <p>Damage: ( { roll.damage[0].join(', ') } ) + { roll.damage[1] } = { roll.damage[2] }</p>
                }
                innerDisplay.push(
                    <div key={roll+i} className='roll'>
                        <h3>{roll.name}</h3>
                        { toHit }
                        { damage }
                        { !toHit ? roll.desc : null }
                    </div>
                );
            })
            rollDisplay.push(
                <div key={key} className='attack-group'>
                    <h2>{key}</h2>
                    { innerDisplay }
                </div>
            );
        }

        console.log('Roll display: ',rollDisplay);
        
        return (
            <div className='attack-rolls'>
                { rollDisplay }
            </div>
        );
    }
}