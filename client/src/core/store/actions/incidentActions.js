import constants from '../constants/incidentActionTypes'
function createIncident(newIncident) {
    console.log(newIncident)
    return {
        type: constants.CREATE_INCIDENT,
        payload: {
            incidents: newIncident,
            selectedIncident: newIncident
        }

    }
}
function getIncident(newIncident) {
    return {
        type: constants.SELECT_INCIDENT,
        payload: {
            selectedIncident: newIncident
        }
    }
}

function getAllIncident(newIncident) {
    return {
        type: constants.LIST_INCIDENTS,
        payload: {
            incidents: newIncident,
            selectedIncident: newIncident
        }
    }
}

export { createIncident, getIncident, getAllIncident }
