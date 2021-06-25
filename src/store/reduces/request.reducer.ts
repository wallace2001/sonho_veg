import { actionTypes } from '../actions/request.action';

const initialState = {
    requests: [
        {
            id: "",
            user_id: "",
            intent: "",
            state: "",
            cart: "",
            payer: {
                payer_info: {
                    email: {
                        email: "",
                        name: ""
                    },
                    shipping_address: {
                        city: "",
                        country_code: "",
                        line1: "",
                        normalization_status: "",
                        postal_code: "",
                        recipient_name: "",
                        state: "",
                    }
                }
            },
            transactions: [
                {
                    amount: {
                        total: ""
                    }
                }
            ],
            date: new Date(),
            telphone: "",
            create_time: new Date(),
            update_time: new Date(),
            status: ""
        }
    ]
}

export const requestReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, 
            requests: payload
        }

    default:
        return state
    }
}
