const router = require('express').Router();
const UserObjectives = require('../../schemas/userObjective');

// router.get('/users', (req, res, next) => {
//     UserObjectives.collection.aggregate([
//         {
//             $match: {
//                 isDeleted: false
//             }
//         },
//         {
//             $project: {
//                 userId: "$userId",
//                 avgScore: { $avg: "$keyResults.score" },
//             }
//         },
//         {
//             $group: {
//                 _id: "$userId",
//                 avgByAllObjectives: { $avg: "$avgScore" }
//             }
//         },
//         {
//             $sort: {
//                 avgByAllObjectives: -1
//             }
//         },
//         {
//             $limit: 5
//         },
//          {
//             $project: {
//                 user: "$_id",
//                 totalScore:  "$avgByAllObjectives" ,
//             }
//         }
//     ], (err, data) => res.send(data));
    // res.send([
    //     {
    //         user: "Peter",
    //         totalScore: 0.78
    //     },
    //     {
    //         user: "Elma",
    //         totalScore: 0.5
    //     },
    //     {
    //         user: "Ronaldo",
    //         totalScore: 0.45
    //     },
    //     {
    //         user: "Grigory",
    //         totalScore: 0.39
    //     },
    //     {
    //         user: "Rixardo",
    //         totalScore: 0.28
    //     }
    // ]);
// });

/*router.get('/progress', (req, res, next) => {
    UserObjectives.collection.aggregate(
        [
            {
                $match: {
                    isDeleted: false
                }
            },
            {
                $project: {
                    userId: "$userId",
                    avgScore: { $avg: "$keyResults.score" },
                }
            },
            {
                $group: {
                    _id: null,
                    progress: { $avg: "$avgScore" }
                }
            }
        ], (err, data) => res.send({ progress: data[0].progress }));
});*/

/*router.get('/categories', (req, res, next) => {
    res.send([
        {
            category: 'Knowledge',
            count: 120
        },
        {
            category: 'Expertise',
            count: 32
        },
        {
            category: 'Projects',
            count: 49
        }
    ]);
})*/

/*router.get('/kresults', (req, res, next) => {
    res.send([
        {
            category: 'Beginner',
            count: 48
        },
        {
            category: 'Intermediate',
            count: 68
        },
        {
            category: 'Advanced',
            count: 105
        }
    ]);
})*/

module.exports = router;