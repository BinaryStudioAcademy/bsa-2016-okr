module.exports = function (res) {
    return (err, data) => {
        if (err) {
            return res.status(err.status || 500).send(err);
        }

        return res.status(200).send(data);
    }
};