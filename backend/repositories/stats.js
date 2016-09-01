const UserObjectives = require('../schemas/userObjective');
var mongo = require('mongodb');

var GetStats = function () {

};

GetStats.prototype.getProgress = function (callback) {
    UserObjectives.collection.aggregate([
        {
            $match: {
                isDeleted: false,
                isArchived: false
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
    ], (err, data) => callback(data))
};

GetStats.prototype.getUsers = function (sort, limit, callback) {
    UserObjectives.collection.aggregate([
        {
            $match: {
                isDeleted: false,
                isArchived: false
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
    ], (err, data) => { callback(data) })
};

GetStats.prototype.getUserById = function (id, callback) {
    UserObjectives.collection.aggregate([
        {
            $match: {
                isDeleted: false,
                isArchived: false,
                userId: id
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
    ], (err, data) =>  callback(data) )
};

GetStats.prototype.getCategories = function (callback) {
    UserObjectives.collection.aggregate(
        [
            {
                $match: {
                    isDeleted: false,
                    isArchived: false
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
        ], (err, data) => { callback(data) })
};

GetStats.prototype.getKeyResults = function (callback) {
    UserObjectives.collection.aggregate(
        [
            {
                $match: {
                    isDeleted: false,
                    isArchived: false
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
        ], (err, data) => { callback(data) })
};
module.exports = new GetStats();
