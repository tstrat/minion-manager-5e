import React, { Component } from 'react';
import axios from 'axios';
import { getMonsterStats } from '../../utils/utils';

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
            ]
        }
    }

    componentDidMount() {
        /*
            Get monsters from back-end database
            With that list, group them by name for diplay
        */
        axios.get(`api/encounters/${ this.props.id }`)
        .then(res => {
            // console.log('Get monsters for encounter', res);
            const monsters = [ ...this.state.monsters ];
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

            this.setState({
                monsters
            });            
        })
    
    }

    render() {

        const { monsters } = this.state;
        console.log(monsters);
        
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
                                <input type='checkbox' />
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
                { monsterList }
            </div>
        );
    }
}