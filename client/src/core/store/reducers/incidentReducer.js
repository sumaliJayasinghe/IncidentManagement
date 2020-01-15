import constants from '../constants/incidentActionTypes';

export default (state = { incidents: [], selectedIncident: {} }, action) => {

    switch (action.type) {
        case constants.CREATE_INCIDENT:
            return action.payload;

        case constants.LIST_INCIDENTS:
            return action.payload;

        case constants.SELECT_INCIDENT:
            return action.payload;

        default:
            return state
    }

}