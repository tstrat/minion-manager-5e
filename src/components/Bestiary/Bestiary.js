import React, { Component } from 'react';
import axios from 'axios';
import StatBlock from '../StatBlock/StatBlock';
import { connect } from 'react-redux';
import { getMonsterStats } from '../../utils/utils';
import './bestiary.css';

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
        axios.get('/api/monsters')
        .then( res => {
            this.setState({
                monsters : res.data
            })
        })
    }

    addMonster = async () => {
        const { monsters, input } = this.state;
        const index = monsters.findIndex(m => m.name.toLowerCase() === input.toLowerCase());

        if ( index >= 0 ) {
            // ${monsterName}, ${name}, ${health}, ${url}, ${encounterId}
            const curr = monsters[index];
            console.log(curr);
            const monster = await getMonsterStats(index);
            console.log(monster);
            const payload = {
                monsterName : monster.name,
                name: this.randomName(monster.name),
                health: monster.hp,
                maxHealth: monster.hp,
                armorClass: monster.ac,
                url: curr.url,
                encounterId : this.props.encounter.id
            }
            console.log('Sending payload', payload);
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
        const regex = new RegExp(this.state.input, 'i');
        const viewList = this.state.monsters.filter(m => m.name.match(regex));

        const monsterList = viewList.map((m,i) => {
            if (this.state.selected === m.name){
                return (
                    <div key={ m.name + i } className="monster">
                        <h3 onClick={ () => this.setState({ selected : '' }) }>{ m.name }</h3>
                        <StatBlock index={ m.index }/>
                    </div>
                )
            }
            else {
                return (
                    <div key={ m.name + i } className="monster">
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
                    <button className="addMonster" onClick={this.addMonster}>Add Monster</button>
                </>
            )
            : null;
        return (
            <div className='bestiary'>
                <div className="header">
                    <input placeholder="Search Bestiary" className="search" value={this.state.input} onChange={e=>this.setState({input: e.target.value})}/>
                    { encounterInput }
                </div>
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
