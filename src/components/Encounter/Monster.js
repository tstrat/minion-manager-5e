import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import armor from '../../media/armor.png';
class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            check: false
        }
    }
    

    render() {
        const mg = this.props.monsterGroup;
        console.log(mg);
        const { expanded } = this.state;
        console.log(`${mg.name} Expanded`, expanded);
        const mlist = 
            mg.list.map( (m, i) =>
                <MonsterDiv key={m + i}>
                    <MonsterName>
                        { m.name }
                    </MonsterName>
                    <Hp>{ m.health }</Hp>
                    <SelectBox>Div</SelectBox>
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

// const mlist = monsterGroup[type].map((m,i) => {
//     return (
//         <div key={type+i} className='monster'>
//             <h3>{ m.name }</h3>
//             <div className='hp'>{ m.hp }</div>
//             <div className='select-monster'>
//                 <Checkbox checked={false} onChange={e => this.select(e.target.checked, m)} />
//                 {/* <input className='checkbox' type='checkbox' onChange={e => this.select(e.target.checked, m)} /> */}
//             </div>
//         </div>
//     )
// })

// returnVal.push(
//     <div key={type} className='monster-group'>
//         <h1>{ type }</h1>
//         { mlist }
//     </div>
// )


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
    :hover {
        height: 60px;
    }
`;

const slideIn = keyframes`
    from {
        height: 0px;
    }
    to {
        height: fit-content;
    }
`;

const CollapseContainer = styled.div`
    overflow: hidden;
    height:  fit-content;
    transition: max-height .5s ease-out;
    width: 100%;
    
    &.show {   
        max-height:  ${ props => `${(props.children.length + 1) * listHeight}px` };
        /*${ props => `${props.children.length * listHeight}px` }; */
        /* animation: ${slideIn} 0.2s linear 0s 1 forwards; */
    }

    &.hide {
        max-height: 0px;
        
    }
`;

const MonsterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
    
`;


const MonsterName = styled.h3`
    height: 50px;
    line-height: 50px;
`;

const Hp = styled.div`
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
    width: 0; 
    height: 0; 
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    margin: 0 10px;
    transition: transform .5s;
    &.arrow-up {
        transform: rotate(45deg) scale(-1,1);
        /* border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        
        border-bottom: 15px solid black; */
    }
    &.arrow-down {
        transform: rotate(135deg);
        /* border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        
        border-top: 15px solid black; */
    } 

    
`;
const SelectBox = styled.div`

`;

const H1 = styled.h1`
    font-size: 20px;
    font-weight: 400;
    line-height: ${`${listHeight}px`};
    margin-left: 2%;
    flex-grow: 2;
`;
