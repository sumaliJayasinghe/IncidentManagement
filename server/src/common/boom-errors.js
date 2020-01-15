var Boom = require('boom');

exports.wrapNano = function wrapNanoError(cb) {
    return function (err) {
        if (err) {
            console.log("boom error")
            console.log(err)
            cb(Boom.badImplementation('terrible implementation'));

        }
        cb.apply(null, arguments);
    };
}