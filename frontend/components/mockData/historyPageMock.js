let now = new Date();
let date = ('0' + now.getDate()).slice(-2) + ' / ' + ('0' + (now.getMonth() + 1)).slice(-2) + ' / ' + now.getFullYear();

let historyMock = [
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
];

export default historyMock;