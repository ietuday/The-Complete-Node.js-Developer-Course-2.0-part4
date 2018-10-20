const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB Server.');

    //deleteMany
    db.collection('TodoApp').deleteMany({
        text: 'Eat lunch'
    }).then((result) => {
        console.log(`Delete Many result ${result}`);
    }, (err) => {
        console.log('Unable to delete todo', err);
    })
    //deleteOne
    db.collection('TodoApp').deleteOne({
        text: 'Eat lunch'
    }).then((result) => {
        console.log(`Delete One result ${result}`);
    }, (err) => {
        console.log('Unable to delete todo', err);
    })

    //findOneAndDelete
    db.collection('TodoApp').findOneAndDelete({
        completed: true
    }).then((result) => {
        // console.log(`findOneAndDelete result : ${result}`);
        console.log(result);
        
    }, (err) => {
        console.log('Unable to delete todo', err);
    })
    // db.close();
})