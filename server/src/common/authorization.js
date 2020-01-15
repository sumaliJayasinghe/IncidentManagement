const expressJwt = require('express-jwt');
const { secret } = require('config.json');
const fs = require('fs');
var path = require('path');

var authorize = function (token, roles = []) {
    var publicKEY = fs.readFileSync(path.resolve('src/api/controllers/public.key'), 'utf8');
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [


        // authenticate JWT token and attach user to request object (req.user)
        jwt.verify(token, publicKEY),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = authorize;