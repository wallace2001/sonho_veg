import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reduces/rootReducer';

let middleware = [ReduxThunk];

export type AppDispatch = typeof store.dispatch;
export const store = createStore(rootReducer, applyMiddleware(...middleware));