import React, { Component } from 'react';
import { getMonsterStats } from '../../utils/utils';
import axios from 'axios';
import AttackRoller from '../Roller/AttackRoller';

export default class Attack extends Component {
    constructor() {
        super();
        this.state = {
            statBlocks: [],
            assigned: {},
            rolling: false,
        }
    }
    componentDidMount() {
        this.fetchStatBlocks();
    }

    fetchStatBlocks = () => {
        const { selected } = this.props;
        // console.log(selected);
        const statBlocks = [];
        const urls = []
        for (let i = 0; i < selected.length; i++ ){
            if (!selected[i].url) {
                continue;
            }
            if (!urls.includes(selected[i].url))  {   
                urls.push(selected[i].url);
            }
            
        }

        for (let url of urls) {
            statBlocks.push(getMonsterStats(url));
        }
        axios.all([...statBlocks])
        .then( res => {
            this.setState({ statBlocks: res });
        })
        
    }

    updateActions = (count, key, action) => {
        // console.log('UpdateActions', action);
        const payload = { [key]: { count: parseInt(count), ...action } };
        const { assigned } = this.state;
        this.setState({
            assigned: { ...assigned, ...payload }
        })
    }

    render() {
        const { statBlocks, assigned, rolling } = this.state;
        if (!statBlocks.length) {
            return (
                <div>Loading...</div>
            )
        }
        console.log(assigned);
        const actions = statBlocks.map(stat => {
            // console.log(stat);
            const actionList = [];
            for (let action of stat.abilities.actions) {
                if (action.name.toLowerCase() === 'multiattack' ) {
                    actionList.push(
                        <div key={stat.name + action.name}>
                            <h3>{ action.name }</h3>
                            <p>{ action.desc }</p>
                            <p>If you wish to use the multi-attack option, please update the other attacks accordingly</p>
                        </div>
                    );
                } else {
                    actionList.push(
                        <div key={stat.name + action.name}>
                            <input type='number' onChange={ e => this.updateActions(e.target.value, stat.name.split(' ').join('_') + '-' + action.name, action) } />
                            <h3>{ action.name }</h3>
                            <p>{ action.desc }</p>
                        </div>
                    );
                }
            }
            return actionList;
        })
        const display = ( !rolling ) ? 
                <div className='attack-actions'>
                    Attack
                    { actions }
                    { Object.keys(assigned).length ? <button onClick={() => this.setState({ rolling: true })}>Roll</button> : null }
                </div>
                : 
                <AttackRoller actions={assigned} />
        return (
            <div className='attack'>
            { display }
            </div>
        )
    }
}