import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';

const enhancer = applyMiddleware(logger);
const store = createStore(reducers, enhancer);

export default store;