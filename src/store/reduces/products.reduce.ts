import { actionTypes } from "../actions/products.action"

const initialState = {
    products: [],
    product: {},
}

export const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { 
            ...state,
            products: [
                payload 
            ]
        }
    
    case actionTypes.SHOW: 
        return {
            ...state,
            product: {
                ...payload
            }
        }

    default:
        return state
    }
}
