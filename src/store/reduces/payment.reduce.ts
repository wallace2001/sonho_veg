import { actionTypes } from "../actions/payment.action"

const initialState = {

}

export const paymentReduce = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
