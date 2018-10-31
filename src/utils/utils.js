import { capitalize } from 'lodash';
import axios from 'axios';

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


/**
 * A long axios call that grabs the specific stats for a monster and returns their information, grouped into
 * an easier to manage javascript object.  This is in utils because it will be used by the bestiary view and probably
 * the encounter view (where actions are important to use).
 * 
 * @param {*} url to dnd5eapi specific to a monster stat block 
 */
export const getMonsterStats = url => {
    return axios.get(url)
        .then( res => {
            const { strength, dexterity, constitution, intelligence, wisdom, charisma,
                    strength_save, dexterity_save, constitution_save, intelligence_save, wisdom_save, charisma_save,
                    name, armor_class, hit_dice, hit_points, actions, special_abilities, legendary_actions,
                    alignment, challenge_rating, condition_immunities, damage_immunities, damage_resistances, damage_vulnerabilities,
                    senses, size, speed, type,
                    acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleight_of_hand, stealth, survival } = res.data;
            
            const skillsList = createStringList({
                acrobatics, 
                animal_handling, 
                arcana, athletics, 
                deception, history, 
                insight, 
                intimidation, 
                investigation, 
                medicine, 
                nature, 
                perception, 
                performance, 
                persuasion, 
                religion, 
                sleight_of_hand, 
                stealth, 
                survival 
            });
            
            return {
                name,
                stats: { 
                    strength, 
                    dexterity, 
                    constitution, 
                    intelligence, 
                    wisdom, 
                    charisma 
                },
                ac: armor_class,
                hp: hit_points,
                hitDice: hit_dice,
                saves: { 
                    STR: strength_save,
                    DEX: dexterity_save,
                    CON: constitution_save,
                    INT: intelligence_save,
                    WIS: wisdom_save,
                    CHA: charisma_save
                },
                details: {
                    alignment,
                    challengeRating: challenge_rating,
                    condition_immunities,
                    damage_immunities,
                    damage_resistances,
                    damage_vulnerabilities,
                    senses,
                    size,
                    speed,
                    type
                },
                abilities: {
                    actions,
                    legendary_actions,
                    special_abilities
                },
                skills: skillsList,
            }
                     
        });
}