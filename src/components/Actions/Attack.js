import React, { Component } from 'react';
import styled from 'styled-components';
import { getMonsterStats } from '../../utils/utils';
import axios from 'axios';
import AttackRoller from '../Roller/AttackRoller';
import AttackAction from './AttackAction';
import { media, size } from '../../utils/mediaQuery';

// import mummy from '../../media/mummy.gif';
// import adventureRun from '../../media/adventureRun.gif';
import loading from '../../media/loader.gif';

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

        /*
        *   LOADING WHILE WAITING ON STATBLOCKS
        */
        if (!statBlocks.length) {
            return (
                <StyledAttackContainer className='attack'>
                    <img src={loading} />
                </StyledAttackContainer>
            )
        }

        /*
            Mapping all actions into a nice list format
        */
        const actions = statBlocks.map(stat => {
            
            const actionList = [];
            for (let action of stat.abilities.actions) {
                actionList.push(<AttackAction stat={stat} action={action} updateActions={this.updateActions}/>)
            }
            return (
                <StyledAttackActionsContainer>
                    <h1>{stat.name}</h1>
                    <CloseButton onClick={this.props.clearButtons}><i class="fas fa-window-close" /></CloseButton>
                    <span>Attacks</span>
                    { actionList }
                    { Object.keys(assigned).length ? <button onClick={() => this.setState({ rolling: true })}>Roll</button> : null }
                </StyledAttackActionsContainer>
            );
        })
        const display = ( !rolling ) ? 
                <>{actions}</>
                : 
                <AttackRoller actions={ assigned } />
        return (
            <Fade>
                <StyledAttackContainer>
                { display }
                </StyledAttackContainer>
            </Fade>
        )
    }
}


const Fade = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    z-index:1;
`;
const StyledAttackContainer = styled.div`
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 100%;
    max-width: ${`${size.tablet-40}px`};
    height: 70vh;
    overflow:scroll;
    border: 1px solid purple;
    ${ media.phone`
        max-width: 90vw;
    `}
    & img {
        height: 100%;
    }
    
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border:none;
    & i {
        font-size: 20px;
    }
`;
const StyledAttackActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow:scroll;
    & span {
        margin: 0 auto;
        text-align: center;
        width:100%;
    }

    & > * {
        margin-bottom: 10px;
    }
`;

