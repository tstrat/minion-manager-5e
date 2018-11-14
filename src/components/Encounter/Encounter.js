import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { media } from '../../utils/mediaQuery';
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
                    
                    this.fetchEncounterMonsters()
                    this.setState({
                        deleteMonster : false,
                        selected: []
                    });
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
            return <Monster key={groupName} monsterGroup={{ name:groupName, list:monsterGroup[groupName] }} selectFn={this.select} />;
        })

        return (
            <StyledEncounterContainer>
                {/* { addMonster ? <AddMonster encounterId={ this.props.id } updateMonsterList={ this.updateMonsterList }/> : null } */}
                { monsterList }
                <AddButton src={addButton} onClick={ () => this.setState({ addMonster: true})} />
                { selected.length 
                    ? 
                        <EncounterActions>
                            <ActionButton color='#EC2127' onClick={()=> this.setState({ attack: !attack, defend: false })}>Attack</ActionButton>
                            <ActionButton color='#03AC13' onClick={()=> this.setState({ attack: false, defend: !defend })}>Defend</ActionButton>
                            {/* <ActionButton color='black' text='white' onClick={ this.deleteAll }>Delete Selected Monsters</ActionButton> */}
                        </EncounterActions>
                    : null }
                { attack ? <Attack selected={ selected } clearButtons={this.clearButtons} /> : defend ? <Defend selected={ selected }/> : null }
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
    position: sticky;
    bottom: 20px;
`;

const AddButton = styled.img`
    max-height: 70px;
    position: sticky;
    bottom: 20px;
    align-self: flex-end;
`;

const ActionButton = styled.button`
    background-color: ${props => props.color};
    color: ${ props => props.text || '#EFEDEF'};
    height: ${actionSize};
    font-size: 22px;
    width: 120px;
    padding: 0 10px;
    border:0;
    
    
`;