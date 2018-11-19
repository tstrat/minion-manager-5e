import React, { Component } from 'react';
import axios from 'axios';
import StatBlock from '../StatBlock/StatBlock';
import { connect } from 'react-redux';
import { map } from 'rsvp';

class Bestiary extends Component {
    constructor(){
        super();
        this.state = {
            monsters: [],
            selected: '',
            input:'',
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

    addMonster = () => {
        const { monsters, input } = this.state;
        const index = monsters.findIndex(m => m.name.toLowerCase() === input.toLowerCase());
        console.log(index);
        if ( index >= 0 ) {
            // ${monsterName}, ${name}, ${health}, ${url}, ${encounterId}
            const monster = monsters[index];
            const payload = {
                monsterName : monster.name,
                name: this.randomName(monster.name),
                health: monster.health,
                url: monster.url,
                encounterId : this.props.encounter.id
            }
            axios.post('/api/monsters', payload)
            .then( res => {
                // console.log("added", res.data);
                this.setState({ input: ''});
            })
        }
    }

    randomName= name => {
        return name + Math.floor((Math.random() * 900 + 100)) + "-" + Math.floor((Math.random() * 900 + 100));
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

        const encounterInput = this.props.encounter.id ? 
            (
                <>
                    <input value={this.state.input} onChange={e=>this.setState({input: e.target.value})}/>
                    <button onClick={this.addMonster}>Add Monster</button>
                </>
            )
            : null;
        return (
            <div className='bestiary'>
            { encounterInput }
            { monsterList }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        encounter: state.encounter,
    }
}

export default connect(mapStateToProps)(Bestiary);