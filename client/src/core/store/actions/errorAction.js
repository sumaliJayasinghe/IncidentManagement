import constants from '../constants/errorActionTypes'

function logError(error) {
    return {
        type: constants.SET_ERROR,
        payload: {
            errorMessage: error,
        }
    }
}


export { logError }
