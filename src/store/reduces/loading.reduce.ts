import { actionName } from '../actions/loading.action';
const initialState = {
    open: true
}

export const loadingReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionName.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
