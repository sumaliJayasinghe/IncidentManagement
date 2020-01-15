import constants from '../constants/userActionTypes'
function logError(error) {

    return {
        type: constants.SET_ERROR,
        payload: {
            errorMessage: error,
        }

    }
}


export { logError }
