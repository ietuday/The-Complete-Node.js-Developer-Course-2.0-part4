const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/moongose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Invalid Object ID');
        return res.status(404).send({});
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log(`Doeesn't find any data`);
            return res.status(404).send({});
        }
        res.send({ todo });
    }).catch((e) => {
        console.log('Got Some Error');
        res.status(400).send({});
    })
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Invalid Id');
        return res.status(404).send({});
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }
        res.status(200).send({ todo })
    }).catch((error) => {
        res.status(400).send({});
    })
});

app.patch('/todos/:id', (req, res) => {
    console.log('Inside patch',req.params.id);
    
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send({});
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
