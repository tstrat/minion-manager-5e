const INITIAL_STATE = {
    encounter : {},
    user: {}
}

const UPDATE_ENCOUNTER_ID = 'UPDATE_ENCOUNTER_ID';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case UPDATE_ENCOUNTER_ID:
            return { ...state, encounter: action.payload };
        case UPDATE_USER:
            return { ...state, user: action.payload };
        case LOGOUT:
            return { encounter: {}, user: {} };
        default:
            return state;
    }
}

export function updateEncounter(encounterObj) {
    return {
        type: UPDATE_ENCOUNTER_ID,
        payload: encounterObj
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}