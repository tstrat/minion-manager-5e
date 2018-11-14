import React, { Component } from 'react';
import styled from 'styled-components';
import armor from '../../media/armor.png';
import Checkbox from '../Checkbox/Checkbox';

class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        }
    }
    
    select = () => {
        const checked = !this.state.check;
        this.setState({
            check: checked
        })
    }

    render() {
        const mg = this.props.monsterGroup;
        const { expanded } = this.state;
        const mlist = 
            mg.list.map( (m, i) =>
                <MonsterDiv key={m + i}>
                    <MonsterName>
                        { m.name }
                    </MonsterName>
                    <Hp>{ m.health }</Hp>
                    <Checkbox selectFn={this.props.selectFn} monster={m}/>
                </MonsterDiv>
            )

        return (
            <MonsterContainer>
                <MonsterGroup onClick={() => this.setState({ expanded: !expanded })}>
                    <H1>{ mg.name }</H1>
                    <Armor img={armor}>{ '10' }</Armor>
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
    line-height: ${`${listHeight}px`};
    text-align: center;
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
`;

const Hp = styled.div`
    margin-left: auto;
    margin-right: 10px;
`;