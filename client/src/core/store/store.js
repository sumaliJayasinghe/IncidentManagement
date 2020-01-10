import { combineReducers, createStore } from 'redux';
import loginReducer from './reducers/loginReducer'
import incidentReducer from './reducers/incidentReducer'

export default () => {
    console.log("HAPPENS")
    return createStore(combineReducers({
        login: loginReducer,
        incidents: incidentReducer
    }), window.devToolsExtension && window.devToolsExtension())
}
