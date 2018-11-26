import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';
import addButton from '../../media/addButton.png';

import Monster from './Monster';
import Attack from '../Actions/Attack';
import Defend from '../Actions/Defend';

export default class Encounter extends Component {
    constructor(){
        super();
        // this.props.id = encounterID
        // or use this.props.match.params from react-router?
        this.state = {
            monsters: [
                // { skeleton: {
                //     statBlock: {}
                //     list: [ skeleton1, 2.., 6.. etc]
                // }}
                // { 
                //     skeleton: {
                //         list: [ { name: 'bob', hp: 12 },{ name: 'rob', hp: 7 },{ name: 'steve', hp: 120 }, ]
                //     },
                //     orc: {
                //         list: [ { name: 'bob', hp: 12 },{ name: 'rob', hp: 7 },{ name: 'steve', hp: 120 }, ]
                //     }
                // }
            ],
            selected: [
                // { type: statblockObj,
                //  count: #selected (increment) 
                // } , ...etc
            ],
            addMonster: false,
            attack: false,
            defend: false
        }
    }

    componentDidMount() {
        /*
            Get monsters from back-end database
            With that list, group them by name for diplay
        */
        this.fetchEncounterMonsters();
    
    }

    fetchEncounterMonsters = () => {
        axios.get(`api/encounters/${ this.props.id }`)
        .then(res => {
            // console.log('Get monsters for encounter', res);
            const monsters = [ ];
            for (let monster of res.data) {
                const monsterName = monster.monster_name;
                // console.log(monsters);
                const index = monsters.findIndex(e => {
                    // console.log('EEEEE',e);
                    return monsterName in e;
                    
                });
                if (index >= 0) {
                    monsters[index][monsterName].push(monster);
                }
                else {
                    monsters.push({});
                    monsters[monsters.length-1][monsterName] = [monster];
                }
            }

            this.setState({ monsters });       
        })
    }

    updateMonsterList = (newMonster) => {
        const { monsters } = this.state;
        const monsterName = newMonster.monster_name;
        let added = false;
        for ( let m of monsters) {
            if (  monsterName in m ) {
                m[monsterName].push(newMonster);
                added = true;
                break;
            }
        }
        if ( !added ) {
            monsters.push({ [monsterName]: [ newMonster ] });
        }

        this.setState({ monsters});
        
    }
    
    select = (checked, monster) => {
        const tmp = this.state.selected;
        
        if ( checked ) {
            tmp.push(monster);
        } else {
            tmp.splice(tmp.findIndex(m => m.id = monster.id), 1);
        }
        this.setState({
            deleteMonster: tmp.length > 0,
            selected: tmp,
            attack: false,
            defend: false
        })
    }

    deleteAll = () => {
        const { selected } = this.state;
        const last = selected[selected.length-1];
        while ( selected.length ) {
            const nextMonster = selected.pop();
            axios.delete(`api/monsters/${ nextMonster.id }`)
            .then( res => {
                if (res.data.id === last.id) {
                    this.fetchEncounterMonsters();
                    this.setState({
                        deleteMonster : false,
                        selected: []
                    }, this.forceUpdate);
                }
            })
        }
        
    }

    clearButtons = () => {
        this.setState({
            attack: false,
            defend: false
        })
    }

    render() {

        const { monsters, selected, attack, defend } = this.state;
        // console.log('selected', selected);
        
        const monsterList = monsters.map(monsterGroup => {
            const groupName = Object.keys(monsterGroup)[0];
            return <Monster key={groupName} monsterGroup={{ name:groupName, list:monsterGroup[groupName] }} selectFn={this.select} update={this.fetchEncounterMonsters} />;
        })

        return (
            <StyledEncounterContainer>
                { this.state.selected.length ? <TrashCan className="fas fa-trash" onClick={this.deleteAll}/> : null }
                { monsterList }
                <ControllDiv>
                    
                    { selected.length 
                        ? 
                            <EncounterActions>
                                <ActionButton color='#EC2127' onClick={()=> this.setState({ attack: !attack, defend: false })}>Attack</ActionButton>
                                <ActionButton color='#03AC13' onClick={()=> this.setState({ attack: false, defend: !defend })}>Defend</ActionButton>
                                {/* <ActionButton color='black' text='white' onClick={ this.deleteAll }>Delete Selected Monsters</ActionButton> */}
                            </EncounterActions>
                        : null }
                    <Link to='/bestiary'><AddButton src={addButton}/></Link>
                    { attack ? <Attack selected={ selected } clearButtons={this.clearButtons} /> : defend ? <Defend selected={ selected }/> : null }
                </ControllDiv>
            </StyledEncounterContainer>
        );
    }
}

const actionSize = '50px';

const StyledEncounterContainer = styled.div`
    width: 100%;
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    
    padding: 2%;
`;
const EncounterActions = styled.div`
    width: 267px;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #222022;
    padding-left: 8px;
    
`;

const TrashCan = styled.i`
    align-self: flex-end;
`;
const AddButton = styled.img`
    max-height: 70px;
`;

const ActionButton = styled.button`
    background-color: ${props => props.color};
    color: ${ props => props.text || '#EFEDEF'};
    height: ${actionSize};
    font-size: 22px;
    width: 120px;
    border:0;
    margin-right: auto;
`;

const ControllDiv = styled.div`
    margin-top: 30px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: sticky;
    bottom: 20px;
    & a {
        margin-left: auto;
    }
`;