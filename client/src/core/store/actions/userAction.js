import constants from '../constants/userActionTypes'

function loginUser(user) {
    return {
        type: constants.USER_LOGIN,
        payload: {
            loggedInUserDetail: user,
        }
    }
}

export { loginUser }
