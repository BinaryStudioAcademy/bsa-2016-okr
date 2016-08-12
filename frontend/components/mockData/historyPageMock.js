let now = new Date();
let date = ('0' + now.getDate()).slice(-2) + ' / ' + ('0' + (now.getMonth() + 1)).slice(-2) + ' / ' + now.getFullYear();

/*let historyMock = [
    {
        id: 0,
        authorId: 1,
        typeId: 0,
        type: 'Edit',
        date: date
    },
    {
        id: 1,
        authorId: 0,
        typeId: 0,
        type: 'Edit',
        date: date
    },
    {
        id: 2,
        authorId: 0,
        typeId: 0,
        type: 'Edit',
        date: date
    },
    {
        id: 3,
        authorId: 0,
        typeId: 0,
        type: 'Edit',
        date: date
    },
    {
        id: 4,
        authorId: 0,
        typeId: 0,
        type: 'Edit',
        date: date
    },
    {
        id: 5,
        authorId: 3,
        typeId: 0,
        type: 'Edit',
        date: date
    }
];*/

let historyMock = [

    {
        "_id": "57aaeba52e95d8941a795597",
        "authorId": "Kelly Bloom",
        "typeId": "To learn Angular",
        "type": "delete",
        "createdAt": "2016-11-26 3:38",
        "updatedAt": "2016-11-26 3:44"
    },
    {
        "_id": "57aaeba52e95d8941a795598",
        "authorId": "Josh Peterson",
        "typeId": "Read the book",
        "type": "update",
        "createdAt": "2016-06-08 4:38",
        "updatedAt": "2016-06-08 4:51"
    },
    {
        "_id": "57aaeba52e95d8941a795591",
        "authorId": "Sahan Roman",
        "typeId": "To do task",
        "type": "delete",
        "createdAt": "2016-06-30 11:19",
        "updatedAt": "2016-06-30 11:35"
    },
    {
        "_id": "57aaeba52e95d8941a795592",
        "authorId": "Taras Barladun",
        "typeId": "To start running in the morning",
        "type": "update",
        "createdAt": "2016-06-30 11:19",
        "updatedAt": "2016-06-30 11:35"
    },
    {
        "_id": "57aaeba52e95d8941a795593",
        "authorId": "Roman Vintish",
        "typeId": "To prepare the cake",
        "type": "create",
        "createdAt": "2016-06-30 11:19",
        "updatedAt": "2016-06-30 11:35"
    }
]

export default historyMock;