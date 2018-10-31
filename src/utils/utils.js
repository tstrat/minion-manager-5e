import { capitalize } from 'lodash';

export const calcMod = (num) => {
    return Math.floor(num / 2) - 5;
}

export const modAsString = (num) => {
    const mod = calcMod(num);
    return num >= 0 ? `(+ ${mod})` : `(- ${mod})`;
}

export const createStringList = (skillObj) => {
    const rtnArr = [];
    for (let key in skillObj) {
        if (skillObj[key]) {
            rtnArr.push(`${capitalize(key)} + ${skillObj[key]}`);
        }
    }
    return rtnArr.join(', ');
}

const crXpChart = {
    0: '0 or 10',
    .125: '25',
    .25: '50',
    .5: '100',
    1: '200',
    2: '450',
    3: '700',
    4: '1,100',
    5: '1,800',
    6: '2,300',
    7: '2,900',
    8: '3,900',
    9: '5,000',
    10: '5,900',
    11: '7,200',
    12: '8,400',
    13: '10,000',
    14: '11,500',
    15: '13,000',
    16: '15,000',
    17: '18,000',
    18: '20,000',
    19: '22,000',
    20: '25,000',
    21: '33,000',
    22: '41,000',
    23: '50,000',
    24: '62,000',
    25: '75,000',
    26: '90,000',
    27: '105,000',
    28: '120,000',
    29: '135,000',
    30: '155,000',
}
export const xpByCR = cr => {
    return crXpChart[cr] + 'XP';
}