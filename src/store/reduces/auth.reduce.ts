import { actionTypes } from '../actions/auth.action';

const initialState = {
    credentials: {
        email: '',
        password: ''
    },
    success: false,
    account: {
        ok: false,
        admin: 0,
        email: "",
        name: "",
        sex: "",
        telphone: ""
    },
    error: {
        ok: false,
        message: ""
    },
    status: false
}

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { 
            ...state, 
            credentials: {
                ...state.credentials,
                ...payload
            }
         }

    case actionTypes.SUCCESS:
        return { 
            ...state, 
            success: payload
        }

    case actionTypes.ACCOUNT:
        return{
            ...state,
            account: {
                ...state.account,
                ...payload
            }
        }

    case actionTypes.ERROR:
        return{
            ...state,
            error: {
                ...state.error,
                ...payload
            }
        }
    case actionTypes.STATUS:
        return{
            ...state,
            status: payload
        }

    default:
        return state
    }
}
