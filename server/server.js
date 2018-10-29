var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://udayaditya.singh:12345678@ds145043.mlab.com:45043/node-app');

var Todo = mongoose.model('Todo', {
    text: {
        type:String,
        required:true,
        minlength:1,
        trim: true
    },
    completed: {
        type:Boolean,
        default:false
    },
    completedAt: {
        type:Number,
        default:null
    }
});

var newTodo = new Todo({
    text: '  Edit the part of video   '
});

newTodo.save().then((doc) => {
    console.log('Saved Todo',doc);
}, (err) => {
    console.log('Unable to save todo',err);
});

var otherTodo = new Todo({
    text: 'Feed at cat',
    completed: true,
    completedAt:123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));   
}, (err) => {
    console.log('Unable to save',err);
});


var User = mongoose.model('User', {
    email: {
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

var user = new User({
    email: '   MY EMAIL   '
});

user.save().then((doc) => {
    console.log('User Saved',doc);
}, (err) => {
    console.log('Unable to save user',err);
    
})