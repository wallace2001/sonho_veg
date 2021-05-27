import { actionName } from '../actions/loading.action';
const initialState = {
    open: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionName.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
