const INITIAL_STATE = {
    encounterId : 1 // CHANGE ON RELEASE
}

const UPDATE_ENCOUNTER_ID = 'UPDATE_ENCOUNTER_ID';

export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case UPDATE_ENCOUNTER_ID:
            return { ...state, encounterId: action.payload };
        default:
            return state;
    }
}

export function updateEncounterId(id) {
    return {
        type: UPDATE_ENCOUNTER_ID,
        payload: id
    }
}