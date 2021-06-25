import { combineReducers } from 'redux';
import { loadingReducer } from './loading.reduce';
import { MessageReducer } from './message.reduce';
import { authReducer } from './auth.reduce';
import { productsReducer } from './products.reduce';
import { notifyReducer } from './notify.reduce';
import { paymentReduce } from './payment.reduce';
import { requestReducer } from './request.reducer';
import { schedulingReducer } from './scheduling.reduce';

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    productsReducer,
    notifyReducer,
    paymentReduce,
    requestReducer,
    schedulingReducer
});

export default rootReducer;