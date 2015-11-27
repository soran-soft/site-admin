import { combineReducers } from 'redux';
import main from './main';
import douban from './douban';

const rootReducer = combineReducers({
    main,
    douban
});

export default rootReducer;