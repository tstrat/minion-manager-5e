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
            count: {},
            rolling: false,
        }
        this.horizontalBarWidth = React.createRef();
    }
    componentDidMount() {
        this.fetchStatBlocks();
    }

    fetchStatBlocks = () => {
        const { selected } = this.props;
        // console.log(selected);
        const statBlocks = [];
        const count = {};
        const urls = []
        for (let i = 0; i < selected.length; i++ ){
            
            if (!selected[i].url) {
                continue;
            }
            if (!urls.includes(selected[i].url))  {  
                urls.push(selected[i].url);
            }
            if (selected[i].monster_name in count) {
                count[selected[i].monster_name].total += 1;
            }
            else {
                count[selected[i].monster_name] = {};
                count[selected[i].monster_name].total = 1;
            }
        }

        for (let url of urls) {
            statBlocks.push(getMonsterStats(url));
        }
        axios.all([...statBlocks])
        .then( res => {
            this.setState({ statBlocks: res, count });
        })
        
    }

    updateActions = (count, key, action) => {
        const payload = { [key]: { count: parseInt(count), ...action } };
        const { assigned } = this.state;

        const currCount = Object.assign({}, this.state.count);
        const curr = currCount[key.split('_').join(' ').split('-')[0]];
        let it = 0;
        const combined = { ...assigned, ...payload };
        for (let i in combined) {
            if (i.split('-')[0] === key.split('-')[0]) {
                it += combined[i].count;
            }
        }
        curr.remaining =  (curr.total - it >=0) ? curr.total - it: 0;

        this.setState({
            assigned: { ...assigned, ...payload },
            count: currCount
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
                    <img src={loading} alt='loading gif' />
                </StyledAttackContainer>
            )
        }

        /*
            Mapping all actions into a nice list format
        */
        const actions = statBlocks.map(stat => {
            const count = this.state.count[stat.name].remaining || this.state.count[stat.name].remaining === 0
             ? this.state.count[stat.name].remaining : this.state.count[stat.name].total;
            

            const actionList = [];
            for (let action of stat.abilities.actions) {
                actionList.push(<AttackAction key={action.name} stat={stat} action={action} updateActions={this.updateActions}/>)
            }
            return (
                <StyledAttackActionsContainer key={stat.name}>
                    <h1 className='monstertype'>{stat.name}</h1>
                    <h3><p>{count}</p> remaining...</h3>
                    <HorizontalBar />
                    
                    <span>Attacks</span>
                    { actionList }
                    { Object.keys(assigned).length ? <RollButton onClick={() => this.setState({ rolling: true })}>Roll</RollButton> : null }
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
                    <CloseButton onClick={this.props.clearButtons}><i className="fas fa-window-close" /></CloseButton>
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
    position:sticky;
    top: 10px;
    left: 100%;
    border:none;
    width: fit-content;
    height: fit-content;
    z-index:5;
    & i {
        font-size: 30px;
        background: white;
    }
`;
const StyledAttackActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow:scroll;
    & span {
        margin: 5px auto;
        text-align: center;
        width:100%;
        font-size: 24px;
        font-weight: 600;
    }

    & > * {
        margin-bottom: 10px;
    }

    & .monstertype {
        font-size: 25px;
        align-self: flex-start; 
        margin-top: 15px;
        margin-left: 15px;       
    }

    & h3 {
        font-size: 18px;
        align-self: flex-start;
        margin-left: 40px;
    }
    & h3 p {
        font-weight: 700;
        color: red;
        display:inline-block;
    }
`;

const HorizontalBar = styled.div`
    height:0;
    width: 0;
    align-self: flex-start;
    margin-left: 20px; 
    border-top: 5px solid transparent;
    border-left: ${`${size.tablet * .8 *.9}px`} solid #EC2127; 
    border-bottom: 5px solid transparent;

    ${media.phone`
        border-left: ${`${size.phone * .8 *.9}px`} solid #EC2127; 
    `}
`;

const RollButton = styled.button`
    height: 50px;
    width: 120px;
    color: white;
    font-size: 22px;
    font-weight: 700;
    background-color: #03AC13;
`;