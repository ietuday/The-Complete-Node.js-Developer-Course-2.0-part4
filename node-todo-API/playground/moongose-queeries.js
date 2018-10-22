const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/moongose');
const { Todo } = require('../server/models/todo');

var id = '5bcc602e9384958a3c6adea011';

if(!ObjectID.isValid(id)){
    console.log('Id is not Valid');
}
Todo.find({
    _id:id
}).then((todos) => {
    console.log('Todos', todos);
},(err) => {
    console.log(`Cannot fetch data of ${id}: ${err}`);
});

Todo.findOne({
    _id:id
}).then((todo) => {
    console.log(`Todo : ${todo}`);
},(err) => {
    console.log(`Cannot fetch data of ${id}: ${err}`); 
});

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log(`Id not found`);
        
    }
    console.log(`Todo By Id : ${todo}`);
}).catch((e) => console.log(e));