import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/userReducer';
import incidentReducer from './reducers/incidentReducer';
import errorReducer from './reducers/errorReducer';

export default () => {

    return createStore(combineReducers({
        user: userReducer,
        incidents: incidentReducer,
        error: errorReducer
    }), window.devToolsExtension && window.devToolsExtension())
}
