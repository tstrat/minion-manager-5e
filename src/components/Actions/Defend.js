import React, { Component } from 'react';
import { getMonsterStats } from '../../utils/utils';
import axios from 'axios';

export default class Defend extends Component {
    constructor() {
        super();
        this.state = {
            statBlocks: []
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
            this.setState({statBlocks: res});
        })
    }

    
    render() {
        // console.log("STATBLOCKS", this.state.statBlocks);
        return (
            <div>
                <button>Saving Throw</button>
                <button>Damage</button>
                <button>Healing</button>
            </div>
        );
    }
}