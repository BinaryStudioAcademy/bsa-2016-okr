const router = require('express').Router();
var mongo = require('mongodb');
const UserObjectives = require('../../schemas/userObjective');

router.get('/users', (req, res, next) => {
    var sort = req.query.sort === "desc" ? 1 : -1;
    var nLimit = Number(req.query.limit);
    var limit = nLimit ? nLimit : 5;
    UserObjectives.collection.aggregate([
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
                _id: "$userId",
                avgByAllObjectives: { $avg: "$avgScore" }
            }
        },
        {
            $sort: {
                avgByAllObjectives: sort
            }
        },
        {
            $limit: limit
        },
        {
            $project: {
                user: "$_id",
                totalScore: "$avgByAllObjectives",
            }
        }
    ], (err, data) => res.send(data));
});

router.get('/users/:id', (req, res, next) => {
    UserObjectives.collection.aggregate([
        {
            $match: {
                isDeleted: false,
                userId: new mongo.ObjectID(req.params.id)
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
                _id: "$userId",
                avgByAllObjectives: { $avg: "$avgScore" }
            }
        },
        {
            $project: {
                user: "$_id",
                totalScore: "$avgByAllObjectives",
            }
        }
    ], (err, data) => res.send(data[0]));
});

router.get('/progresse', (req, res, next) => {
    UserObjectives.collection.aggregate([
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
    ], (err, data) => res.send({ progress: data[0].progress }))
})

router.get('/categories', (req, res, next) => {
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
                    templateId: "$templateId",
                    avgScore: { $avg: "$keyResults.score" },
                }
            },
            {
                $lookup: {
                    from: "objectives",
                    localField: "templateId",
                    foreignField: "_id",
                    as: "template"
                }
            },
            {
                $unwind: "$template"
            },
            {
                $project: {
                    userId: "$userId",
                    templateId: "$templateId",
                    avgScore: "$avgScore",
                    categoryId: "$template.category",
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $group: {
                    _id: { _id: "$category._id", title: "$category.title" },
                    avgScore: { $avg: "$avgScore" },
                }
            },
            {
                $project: {
                    _id: "$_id._id",
                    title: "$_id.title",
                    score: "$avgScore"
                }
            }
        ], (err, data) => res.send(data));
})

router.get('/keyresults', (req, res, next) => {
    UserObjectives.collection.aggregate(
        [
            {
                $match: {
                    isDeleted: false
                }
            },
            {
                $unwind: "$keyResults"
            },
            {
                $project: {
                    score: "$keyResults.score",
                    templateId: "$keyResults.templateId"
                }
            },
            {
                $lookup: {
                    from: "keyresults",
                    localField: "templateId",
                    foreignField: "_id",
                    as: "template"
                }
            },
            {
                $unwind: "$template"
            },
            {
                $group: {
                    _id: "$template.difficulty",
                    avgScore: { $avg: "$score" },
                }
            },
            {
                $project: {
                    title: "$_id",
                    score: "$avgScore"
                }
            }
        ], (err, data) => res.send(data))
})

module.exports = router;
