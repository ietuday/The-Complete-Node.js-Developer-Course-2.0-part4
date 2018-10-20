const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB Server.');

    //findOneAndUpdate
    db.collection('TodoApp').findOneAndUpdate({
       _id: new ObjectID('5bc46172ac879e67ffd0afae')
    },{
        $set: {
            completed: false
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    },(err) => {
        console.log('Unable to update:',err)
    });

    db.collection('Users').findOneAndUpdate({
        name: 'Udayaditya Singh'
     },{
         $set: {
             name: 'Jen'
         },
         $inc: {
             age: 1
         }
     },{
         returnOriginal: false
     }).then((result) => {
         console.log(result);
     },(err) => {
         console.log('Unable to update:',err)
     });
    // db.close();
})