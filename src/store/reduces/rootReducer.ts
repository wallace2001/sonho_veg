import { combineReducers } from 'redux';
import loadingReducer from './loading.reduce';
import notifyRedycer from './message.reduce';
import authReducer from './auth.reduce';

const rootReducer = combineReducers({
    loadingReducer,
    notifyRedycer,
    authReducer
});

export default rootReducer;