import React, { Component } from 'react';
import { getMonsterStats } from '../../utils/utils';
import axios from 'axios';
export default class Attack extends Component {
    constructor() {
        super();
        this.state = {
            statBlocks: [],
            assigned: 0
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

    updateActions = (count, action) => {
        console.log('UpdateActions', action);
    }

    render() {
        const { statBlocks, assigned } = this.state;
        if (!statBlocks.length) {
            return (
                <div>Loading...</div>
            )
        }

        const actions = statBlocks.map(stat => {
            console.log(stat);
            const actionList = [];
            for (let action of stat.abilities.actions) {
                if (action.name.toLowerCase() === 'multiattack' ) {
                    actionList.push(
                        <div>
                            <h3>{ action.name }</h3>
                            <p>{ action.desc }</p>
                            <p>If you wish to use the multi-attack option, please update the other attacks accordingly</p>
                        </div>
                    );
                } else {
                    actionList.push(
                        <div>
                            <input type='number' onChange={ e => this.updateActions(e.target.value, action) } />
                            <h3>{ action.name }</h3>
                            <p>{ action.desc }</p>
                        </div>
                    );
                }
            }
            return actionList;
        })
        return (
            <div>
                Attack
                { actions }
            </div>
        );
    }
}