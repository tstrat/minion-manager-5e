import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
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
                    <Checkbox>Div</Checkbox>
                </MonsterDiv>
            )

        return (
            <MonsterContainer>
                <MonsterGroup onClick={() => this.setState({ expanded: !expanded })}>
                    <H1>{ mg.name }</H1>
                </MonsterGroup>
                <CollapseContainer className={expanded ? 'show' : ''}>
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;
`;

const slideIn = keyframes`
    from {
        height: 0px;
    }
    to {
        height: 50px;
    }
`;

const CollapseContainer = styled.div`
    height: 0px;
    overflow: hidden;
    transition: height .5s;
    width: 100%;
    &.show {
        
        height: ${ props => `${props.children.length * listHeight}px` };
        /* animation: ${slideIn} 0.2s linear 0s 1 forwards; */
        
    }
`;
const MonsterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: -1px solid red;
    
`;


const MonsterName = styled.h3`
    height: 50px;
    line-height: 50px;
`;

const Hp = styled.div`
`;
const Checkbox = styled.div`
`;

const H1 = styled.h1`
    font-size: 20px;
    
`;

