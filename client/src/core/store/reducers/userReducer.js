import constants from '../constants/userActionTypes';

export default (state = { loggedInUserDetail: {} }, action) => {
    console.log(action)
    switch (action.type) {
        case constants.USER_LOGIN:
            return action.payload;

        default:
            return state
    }

}