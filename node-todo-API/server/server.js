var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb'); 

var {mongoose} = require('./db/moongose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.status(200).send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) =>{
    Todo.find().then((todos) =>{
        res.send({todos});
    }, (error) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log('Invalid Object ID');
        return res.status(404).send({});
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log(`Doeesn't find any data`);
            return res.status(404).send({});
        }
        res.send({todo});
    }).catch((e) => {
        console.log('Got Some Error');
        res.status(400).send({});
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = { app };
