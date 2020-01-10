import constants from '../constants/incidentActionTypes';

export default (state = { incidentList: [], selectedIncident: {} }, action) => {

    switch (action.type) {
        case constants.CREATE_INCIDENT:
            return action.payload;

        default:
            return state
    }

}