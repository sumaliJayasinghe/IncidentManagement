var Boom = require('boom');

exports.wrapNano = function wrapNanoError(cb) {
    return function (err) {
        if (err) {
            console.log(err)
            Boom.badImplementation('terrible implementation');
        }
        cb.apply(null, arguments);
    };
}