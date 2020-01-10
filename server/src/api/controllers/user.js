var users = require('../../../database/models/user');
var util = require('../../utility/util')
var jwt = require('jsonwebtoken');


var authenticate = (req, res) => {

    if (!req.body.username || !req.body.password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return res.status(401).end()
    }

    const user = users.getUsersById(req.body.username, (err, data) => {
        console.log(data)
        // if (err || data[username] !== req.body.password) {
        //     throw err;
        // }
        if (user) {
            const token = jwt.sign({ sub: user.id, role: user.role }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });
            users.update(req.body, (err, data) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
                res.send(util.structureResponse(200, data));
            });

        }
    });

}
var createUser = (req, res) => {
    req.body.createdDate = new Date().getTime();
    users.create(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

var getUsersByRole = (req, res) => {
    users.getUsersByRole(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

var updateUser = (req, res) => {
    users.update(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

var deleteUser = (req, res) => {
    users.delete(req.body._id, req.body._rev, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}


module.exports = {
    getUsersByRole: getUsersByRole,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    authenticate: authenticate
}