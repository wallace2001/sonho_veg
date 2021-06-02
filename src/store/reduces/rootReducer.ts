import { combineReducers } from 'redux';
import { loadingReducer } from './loading.reduce';
import { MessageReducer } from './message.reduce';
import { authReducer } from './auth.reduce';
import { productsReducer } from './products.reduce';
import { notifyReducer } from './notify.reduce';

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    productsReducer,
    notifyReducer
});

export default rootReducer;