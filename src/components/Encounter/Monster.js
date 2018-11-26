import React, { Component } from 'react';
import styled from 'styled-components';
import armor from '../../media/armor.png';
import Checkbox from '../Checkbox/Checkbox';
import axios from 'axios';

class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            edit: null,
            inputHealth: '',
            inputName: '',
        }
    }
    
    select = () => {
        const checked = !this.state.check;
        this.setState({
            check: checked
        })
    }

    getStyle = (curr, max) => {
        const ratio = curr/max;
        let color = 'white';
        if (ratio > .9) {
            color = 'green'
        }
        else if ( ratio > .6) {
            color = 'yellow';
        }
        else if ( ratio > .3) {
            color = 'orange';
        }
        else {
            color = 'red';
        }
        return {
            'backgroundColor': color,
            'height': '100%',
            'width': `${ratio*100}%`,
        }
    }

    updateMonster = () => {
        const { edit, inputName } = this.state;
        let inputHealth = parseInt(this.state.inputHealth);
        if (inputHealth > edit.max_health) {
            inputHealth = edit.max_health;
        } else if (inputHealth < 0) {
            inputHealth = 0;
        }
        const edited = { ...edit, name: inputName || edit.name, health: (!inputHealth && inputHealth !== 0) ? edit.health : inputHealth }
        axios.patch(`/api/monsters/`, edited)
        .then( res => {
            this.setState({ edit: null });
            this.props.update();
        })
    }

    render() {
        const mg = this.props.monsterGroup;
        const { expanded, edit } = this.state;
        const editModal = !edit ? null :
            <Fade>
                <EditWindow>
                    <Close onClick={()=> { this.setState({ edit: null })}}>
                        <i className="fas fa-window-close" />
                    </Close>

                    <h1>{edit.name}</h1>
                    
                    <h3> Change Name: </h3>
                    <input value={this.inputName} placeholder={edit.name} onChange={ e=> this.setState({ inputName: e.target.value })}></input>
                    <h3> Change Health: </h3>
                    <input type='number' value={this.inputHealth} placeholder={edit.health} onChange={ e=> this.setState({ inputHealth: e.target.value })}></input>
                    <button onClick={this.updateMonster}>Save Changes</button>
                </EditWindow>
            </Fade>
        const mlist = 
            mg.list.map( (m, i) =>
                <MonsterDiv key={m + i}>
                    <MonsterName>
                        { m.name }
                        <i className="fas fa-pen-nib" onClick={() => this.setState({ edit: m})}></i>
                    </MonsterName>
                    <Hp>
                        { m.health } / { m.max_health }
                        <HpBar >
                            <div style={ this.getStyle(m.health, m.max_health) }></div>
                        </HpBar>
                    </Hp>
                    <Checkbox selectFn={this.props.selectFn} monster={m}/>
                </MonsterDiv>
            );

        return (
            <MonsterContainer>
                { edit ? editModal : null }
                <MonsterGroup onClick={() => this.setState({ expanded: !expanded })}>
                    <H1>{ mg.name }</H1>
                    <Armor img={armor}>{ mg.list[0].armor_class }</Armor>
                    <Expand className={expanded ? 'arrow-up' : 'arrow-down' }/>
                </MonsterGroup>
                <CollapseContainer className={expanded ? 'show' : 'hide'}>
                    {mlist}
                </CollapseContainer>
            </MonsterContainer>
        );
    }
};

export default Monster;

const listHeight = 50;

const MonsterContainer = styled.div`
    width: 100%;
`;

const MonsterGroup = styled.div`
    border: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CollapseContainer = styled.div`
    overflow: hidden;
    height:  fit-content;
    transition: max-height .5s ease-out;
    width: 100%;
    
    &.show {   
        max-height:  ${ props => `${(props.children.length + 1) * listHeight}px` };
        /*${ props => `${props.children.length * listHeight}px` }; */
    }

    &.hide {
        max-height: 0px;
    }
`;

const Armor = styled.div`
    /* margin-left: auto; */
    background-image: url(${props => props.img});
    background-size: ${`${listHeight}px`},${`${listHeight}px`};
    background-repeat: no-repeat;
    height: ${`${listHeight}px`};
    width: ${`${listHeight}px`};
    line-height: ${`${listHeight-10}px`};
    text-align: center;
    font-weight: 600;
    font-size: 18px;
`;

const Expand = styled.div`
    /* margin-left: auto; */
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    margin: 0 10px;
    transition: transform .5s;
    &.arrow-up {
        transform: rotate(45deg) scale(-1,1);
    }
    &.arrow-down {
        transform: rotate(135deg);
    } 
`;

const H1 = styled.h1`
    font-size: 20px;
    font-weight: 400;
    line-height: ${`${listHeight}px`};
    margin-left: 2%;
    flex-grow: 2;
`;


const MonsterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
`;


const MonsterName = styled.h3`
    height: 50px;
    line-height: 50px;
    margin-right: auto;
    margin-left: 10px;

    & i {
        font-size: 18px;
        color: #999999;
        margin-left: 15px;
    }
`;

const Hp = styled.div`
    margin-left: auto;
    margin-right: 10px;
`;

const HpBar = styled.div`
    height: 10px;
    width: 120px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
`;

const Fade = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    z-index:1;
    background-color: rgb(153, 153, 153, 0.4);
    display:flex;
    justify-content: center;
    align-items: center;
`;
const EditWindow = styled.div`
    position:relative;
    min-width: 350px;
    min-height: 350px;
    max-height: 90%;
    max-width: 1000px;
    width:80%;
    height: 80%;
    background-color: white;
    opacity: 1;
    z-index: 2;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
        margin-bottom: 20px;
    }
    & h1 {
        font-size: 30px;
    }
    & h3 {
        font-size: 25px;
    }
    & input {
        width: 80%;
        height: 30px;
        font-size: 25px;
        padding-left: 10px;
    }
`;

const Close = styled.div`
    position:absolute;
    top:0;
    right:0;
    font-size: 20px;
    color: black;
`;