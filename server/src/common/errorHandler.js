module.exports = function (err, req, res, next) {
    console.log(err.output);
    res.set(err.output.headers);
    res.status(err.output.statusCode);
    res.send(err.output.payload);
};