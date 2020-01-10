var users = require('../../../database/models/user');
var util = require('../../utility/util')

var createUser = (user) => {
    return users.create(user, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

var getUsersByRole = (role_id) => {
    return users.getUsersByRole(role_id, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

var updateUser = (user) => {
    return users.update(user, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

var deleteUser = (id, rev) => {
    return users.delete(id, rev, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

var getUsersById = (id) => {
    return users.delete(id, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}


module.exports = {
    getUsersByRole: getUsersByRole,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    authenticate: authenticate,
    getUsersById: getUsersById
}