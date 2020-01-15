module.exports = function (err, req, res, next) {
    console.log("err.output.payload");
    console.log(JSON.stringify(err.output.payload));
    res.set(err.output.headers);
    res.status(err.output.statusCode);
    err.output.payload.status = err.output.payload.statusCode;
    res.send(JSON.stringify(err.output.payload));
};