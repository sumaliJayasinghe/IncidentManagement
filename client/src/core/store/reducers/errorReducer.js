import constants from '../constants/errorActionTypes';

export default (state = { errorMessage: '' }, action) => {
    switch (action.type) {
        case constants.SET_ERROR:
            return action.payload;

        default:
            return state
    }

}