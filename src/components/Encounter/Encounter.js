import React, { Component } from 'react';
import axios from 'axios';
import AddMonster from '../AddMonster/AddMonster';
import Checkbox from '../Checkbox/Checkbox';
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
        console.log(newMonster);
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
        // console.log('checkbox', checked);
        // console.log('checkedMonster', monster);
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
                // console.log('res.data', res.data);
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
    render() {

        const { monsters, addMonster, selected, attack, defend } = this.state;
        // console.log('DeleteMonster', deleteMonster);
        // console.log('selected', selected);
        
        const monsterList = monsters.map(monsterGroup => {
            // console.log(monsterGroup);
            let returnVal = [];
            for ( let type in monsterGroup ) {
                const mlist = monsterGroup[type].map((m,i) => {
                    return (
                        <div key={type+i} className='monster'>
                            <h3>{ m.name }</h3>
                            <div className='hp'>{ m.hp }</div>
                            <div className='select-monster'>
                                <Checkbox checked={false} onChange={e => this.select(e.target.checked, m)} />
                                {/* <input className='checkbox' type='checkbox' onChange={e => this.select(e.target.checked, m)} /> */}
                            </div>
                        </div>
                    )
                })

                returnVal.push(
                    <div key={type} className='monster-group'>
                        <h1>{ type }</h1>
                        { mlist }
                    </div>
                )
            }

            return returnVal;
        })


        return (
            
            <div className="encounter">
                { selected.length 
                    ? 
                        <div>
                            <button onClick={()=> this.setState({ attack: !attack, defend: false })}>Attack</button>
                            <button onClick={()=> this.setState({ attack: false, defend: !defend })}>Defend</button>
                            <button onClick={ this.deleteAll }>Delete Selected Monsters</button>
                        </div>
                    : null }
                { addMonster ? <AddMonster encounterId={ this.props.id } updateMonsterList={ this.updateMonsterList }/> : null }
                { monsterList }
                <button onClick={ () => this.setState({ addMonster: true})}>AddMonster</button>
                { attack ? <Attack selected={ selected }/> : defend ? <Defend selected={ selected }/> : null }
            </div>
        );
    }
}