import { combineReducers } from 'redux';
import * as mainReducer from './main';

const rootReducer = combineReducers(mainReducer);

export default rootReducer;