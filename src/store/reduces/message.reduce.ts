import { actionName } from '../actions/loading.action';
const initialState = {
    open: false,
    time: 2 * 1000,
    class: 'success',
    message: 'Dados atualizados'
}

export const MessageReducer = (state = initialState, { type, payload }) => {
    console.log(payload);
    switch (type) {

    case actionName.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
