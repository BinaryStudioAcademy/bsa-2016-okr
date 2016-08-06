module.exports = function (res) {
    return (err, data) => {
        if (err) {
            res.status(err.status || 400).send(err);
        }
        res.send(data);
    }
};