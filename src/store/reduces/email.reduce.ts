import { actionTypes } from "../actions/email.action"

const initialState = {
    message: '',

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.SEND:
        console.log(payload);
        return { ...state, ...payload }

    default:
        return state
    }
}
