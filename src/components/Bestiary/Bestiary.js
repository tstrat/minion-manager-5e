import React, { Component } from 'react';
import axios from 'axios';
import StatBlock from '../StatBlock/StatBlock';


export default class Bestiary extends Component {
    constructor(){
        super();
        this.state = {
            monsters: [],
            selected: ''
        }
    }

    componentDidMount() {
        axios.get('http://www.dnd5eapi.co/api/monsters/')
        .then( res => {
            this.setState({
                monsters : res.data.results
            })
        })
    }
    render() {

        const monsterList = this.state.monsters.map((m,i) => {
            if (this.state.selected === m.name){
                return (
                    <div key={ m.name + i }>
                        <h3 onClick={ () => this.setState({ selected : '' }) }>{ m.name }</h3>
                        <StatBlock url={ m.url }/>
                    </div>
                )
            }
            else {
                return (
                    <div key={ m.name + i }>
                        <div onClick={ () => this.setState({ selected: m.name }) }>
                            <h3>{ m.name }</h3>
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className='bestiary'>
            { monsterList }
            </div>
        );
    }
}