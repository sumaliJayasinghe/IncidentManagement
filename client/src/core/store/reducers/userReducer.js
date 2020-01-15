import constants from '../constants/userActionTypes';

export default (state = { loggedInUserDetail: {} }, action) => {

    switch (action.type) {
        case constants.USER_LOGIN:
            return action.payload;

        default:
            return state
    }

}