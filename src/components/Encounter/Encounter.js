import React, { Component } from 'react';
import axios from 'axios';
import { groupBy } from 'lodash';
import { getMonsterStats } from '../../utils/utils';

export default class Encounter extends Component {
    constructor(){
        super();

        // this.props.id = encounterID
        // or use this.props.match.params from react-router?
        this.state = {
            monsters: [
                // { skeleton: {
                //     ac: _, -- need from another axios call?  should I store this in db?
                //     list: [ skeleton1, 2.., 6.. etc]
                // }}
            ]
        }
    }

    componentDidMount() {
        /*
            Get monsters from back-end database
            With that list, group them by name for diplay
        */
        // axios.get()
    
    }

    render() {
        return (
            <div className="encounter">

            </div>
        );
    }
}