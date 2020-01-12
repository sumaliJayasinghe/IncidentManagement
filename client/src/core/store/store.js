import { combineReducers, createStore } from 'redux';
import { userReducer, incidentReducer } from './reducers';

export default () => {
    console.log("HAPPENS")
    return createStore(combineReducers({
        user: userReducer,
        incidents: incidentReducer
    }), window.devToolsExtension && window.devToolsExtension())
}
