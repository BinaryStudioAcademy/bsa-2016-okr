const router = require('express').Router();

router.get('/users', (req, res, next) => {

    res.send([
        {
            user: "Peter",
            totalScore: 0.78
        },
        {
            user: "Elma",
            totalScore: 0.5
        },
        {
            user: "Ronaldo",
            totalScore: 0.45
        },
        {
            user: "Grigory",
            totalScore: 0.39
        },
        {
            user: "Rixardo",
            totalScore: 0.28
        }
    ]);
});

module.exports = router;