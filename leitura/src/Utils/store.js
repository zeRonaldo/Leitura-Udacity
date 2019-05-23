import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import reducers from '../Reducers';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger))