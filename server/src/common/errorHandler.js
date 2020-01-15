module.exports = function (err, req, res, next) {
    res.set(err.output.headers);
    res.status(err.output.statusCode);
    err.output.payload.status = err.output.payload.statusCode;
    res.send(JSON.stringify(err.output.payload));
};