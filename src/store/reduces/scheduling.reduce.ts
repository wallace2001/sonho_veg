import { actionTypes } from '../actions/scheduling.action';

const initialState = {
    date: ""
}

export const schedulingReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, date: payload }

    default:
        return state
    }
}
