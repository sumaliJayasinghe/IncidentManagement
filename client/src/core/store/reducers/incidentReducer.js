import constants from '../constants/incidentActionTypes';

export default (state = { incidents: [], selectedIncident: {} }, action) => {

    switch (action.type) {
        case constants.CREATE_INCIDENT:
            console.log(action)
            return action.payload;
        case constants.LIST_INCIDENTS:
            console.log(action)
            return action.payload;
        case constants.SELECT_INCIDENT:
            console.log(action)
            return action.payload;
        default:
            console.log("action refresh")
            console.log(action)
            return state
    }

}