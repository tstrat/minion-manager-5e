import React, { Component } from 'react';
import axios from 'axios';
import { modAsString, createStringList, xpByCR } from '../../utils/utils';

import './statblock.css';

export default class StatBlock extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            stats: {},
            ac: 0,
            hp: 0,
            hitDice: '',
            details: {
                // includes :
                //   senses
                //   languages
                //   speed (and speed types)
                //   alignment
                //   size
                //   CR
                //   type e.g. humanoid, dragon, undead etc.
            },
            skills: [],
            saves: {},
            abilities: {},
            loading: true
        }

    }

    componentDidMount() {
        axios.get(this.props.url)
        .then( res => {
            console.log(res.data);
            const { strength, dexterity, constitution, intelligence, wisdom, charisma,
                    strength_save, dexterity_save, constitution_save, intelligence_save, wisdom_save, charisma_save,
                    name, armor_class, hit_dice, hit_points, actions, special_abilities, legendary_actions,
                    alignment, challenge_rating, condition_immunities, damage_immunities, damage_resistances, damage_vulnerabilities,
                    senses, size, speed, type,
                    acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleight_of_hand, stealth, survival } = res.data;
            
            const skillsList = createStringList({
                acrobatics, 
                animal_handling, 
                arcana, athletics, 
                deception, history, 
                insight, 
                intimidation, 
                investigation, 
                medicine, 
                nature, 
                perception, 
                performance, 
                persuasion, 
                religion, 
                sleight_of_hand, 
                stealth, 
                survival 
            });
            
            this.setState({
                name,
                stats: { 
                    strength, 
                    dexterity, 
                    constitution, 
                    intelligence, 
                    wisdom, 
                    charisma 
                },
                ac: armor_class,
                hp: hit_points,
                hitDice: hit_dice,
                saves: { 
                    STR: strength_save,
                    DEX: dexterity_save,
                    CON: constitution_save,
                    INT: intelligence_save,
                    WIS: wisdom_save,
                    CHA: charisma_save
                },
                details: {
                    alignment,
                    challengeRating: challenge_rating,
                    condition_immunities,
                    damage_immunities,
                    damage_resistances,
                    damage_vulnerabilities,
                    senses,
                    size,
                    speed,
                    type
                },
                abilities: {
                    actions,
                    legendary_actions,
                    special_abilities
                },
                skills: skillsList,
                loading: false
            })
                     
        })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        const { name, hp, ac, hitDice, stats, saves, details, skills, abilities } = this.state;
        const savingThrows = createStringList(saves);

        let special, legendaryActionList;
        if (abilities.special_abilities) {
            special = abilities.special_abilities.map(sp => {
                return <p>{sp.name} {sp.desc}</p>
            });
        }

        const actionList = abilities.actions.map(action => {
            return <p>{action.name}. {action.desc}</p>
        });
        
        if (abilities.legendary_actions) {
            legendaryActionList = abilities.legendary_actions.map(action => {
                return <p>{action.name}. {action.desc}</p>
            });
        }

        return (
            <div className="statblock">
                <div>
                    <h1>{ name }</h1>
                    <h3>{ details.size } { details.type }, { details.alignment }</h3>
                </div>
                <div>
                    <p>Armor Class { ac }</p>
                    <p>Hit Points { hp } { hitDice }</p>
                    <p>Speed { details.speed }</p>
                </div>
                
                <div className="statistics">
                    <ul>
                        <li>
                            <h3>STR</h3>
                            <h3>{ stats.strength }</h3>
                            <h3>{ modAsString(stats.strength) }</h3>
                        </li>
                        <li>
                            <h3>DEX</h3>
                            <h3>{ stats.dexterity }</h3>
                            <h3>{ modAsString(stats.dexterity) }</h3>
                        </li>
                        <li>
                            <h3>CON</h3>
                            <h3>{ stats.constitution }</h3>
                            <h3>{ modAsString(stats.constitution) }</h3>
                        </li>
                        <li>
                            <h3>INT</h3>
                            <h3>{ stats.intelligence }</h3>
                            <h3>{ modAsString(stats.intelligence) }</h3>
                        </li>
                        <li>
                            <h3>WIS</h3>
                            <h3>{ stats.wisdom }</h3>
                            <h3>{ modAsString(stats.wisdom) }</h3>
                        </li>
                        <li>
                            <h3>CHA</h3>
                            <h3>{ stats.charisma }</h3>
                            <h3>{ modAsString(stats.charisma) }</h3>
                        </li>
                    </ul>
                </div>
                <div className="details">
                    { savingThrows ? <p>Saving Throws {savingThrows}</p> : null }
                    { skills ? <p>Skills {skills}</p> : null }
                    { details.condition_immunities ? <p>Condition Immunities { details.condition_immunities }</p> : null }
                    { details.damage_immunities ? <p>Damage Immunities { details.damage_immunities }</p> : null }
                    { details.damage_resistances ? <p>Damage Resistances { details.damage_resistances }</p> : null }
                    { details.damage_vulnerabilities ? <p>Damage Vulnerabilities { details.damage_vulnerabilities }</p> : null }
                    { details.senses ? <p>Senses { details.senses }</p> : null }
                    { details.language ? <p>Languages { details.language }</p> : null }
                    { details.challengeRating 
                        ? 
                            <p>Challenge { details.challengeRating } ({ xpByCR(details.challengeRating) })</p> 
                        : 
                            null 
                    }
                </div>
                <div className="special-abilities">
                    { special }
                </div>
                <div className="Actions">
                    <h1>Actions</h1>
                    { actionList }
                </div>
                { abilities.legendary_actions
                    ? 
                        <div>
                            <h1>Legendary Actions</h1>
                            { legendaryActionList }
                        </div>
                    : null
                }

            </div>
        );
    }
}