import React, { Component } from 'react';
import axios from 'axios';
import Encounter from './Encounter';
import { capitalize } from 'lodash';


export default class EncounterManager extends Component {
    constructor() {
        super();
        this.state = {
            monsterList: [],
            encounterId: 1,
            search: '',
            predictions: []
        }
    }

    componentDidMount() {
        axios.get('http://www.dnd5eapi.co/api/monsters/')
        .then( res => {
            this.setState({
                monsterList : res.data.results
            })
            console.log(res.data.results);
        })
    }

    searchPrediction = e => {
        const searchStr = e.target.value;
        const { monsterList } = this.state;
        const predictedArray = []
        if (searchStr.length) {
            for ( let monster of monsterList ) {
                if ( predictedArray.length >= 5 ) {
                    //console.log(predictedArray.length)
                    break;
                }
                //console.log(monster);
                const monsterName = monster.name.toLowerCase();
                const searchLower = searchStr.toLowerCase();
                if ( monsterName.match(searchLower) && predictedArray.length < 5 ) {
                    const start = capitalize(monsterName.slice(0,monsterName.indexOf(searchLower)));
                    const middle = start.length ? searchLower : capitalize(searchLower);
                    const end = monsterName.slice(monsterName.indexOf(searchLower)+searchLower.length);

                    // console.log(monsterName.slice(0, monsterName.indexOf(searchLower)));
                    predictedArray.push(
                        <li key={monsterName} className="prediction-item">
                            <span className="prediction-text" onClick={ () => this.setState({ search: capitalize(monsterName), predictions: [] }) }>
                                { start }
                                <strong>{middle}</strong>
                                { end }
                            </span>
                        </li>
                    );
                }
            }
        }
        this.setState({
            search: capitalize(searchStr),
            predictions: predictedArray
        })
    }

    addMonster = () => {
        const { monsterList, search } = this.state;
        console.log('here', search);
        const monsterIndex = monsterList.findIndex(m => m.name.toLowerCase() === search.toLowerCase())
        if (monsterIndex >= 0) {
            const url = monsterList[monsterIndex].url;

            axios.get(url)
            .then(res => {
                const monsterData = res.data;
                return {
                    monsterName : monsterData.name,
                    name: monsterData.name + '00000',
                    health: monsterData.hit_points,
                    url: url,
                    encounterId: 1
                }
            }).then(payload => {
                axios.post('/api/monsters', payload)
                .then(res => {
                    console.log("success! Added new monster!", res);
                    this.setState({
                        search:''
                    })
                });
            });
        }
    }

    render() {
        const { monsterList, encounterId, search, predictions } = this.state;
        return (
            <div>
                <div>
                    <h1>Encounter 1</h1>
                    <div>
                        <input value={ search } onChange={ this.searchPrediction } />
                        { predictions }
                        <button onClick={ this.addMonster }>AddMonster</button>
                    </div>
                </div>
                <Encounter id={ encounterId } />
            </div>
        );
    }
}