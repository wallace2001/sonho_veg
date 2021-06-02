import { actionTypes } from "../actions/notify.action"

const initialState = {
    open: false,
    title: "",
    status: 'success',
    duration: 2 * 1000
}

export const notifyReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
