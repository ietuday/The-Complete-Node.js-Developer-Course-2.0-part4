const { ObjectID } = require('mongodb');

const { moongose } = require('../server/db/moongose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


Todo.remove({}).then((result) => {
    console.log(result);
});


Todo.findOneAndRemove({_id: '5bd6f1dbb391946c01939e39'}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('5bd6f19cb391946c01939e38').then((todo) => {
    console.log(todo);
});
