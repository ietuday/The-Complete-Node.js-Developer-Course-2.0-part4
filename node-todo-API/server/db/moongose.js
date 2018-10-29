var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 process.env.MONGODB_URI = 'mongodb://uday:uday123456@ds145043.mlab.com:45043/node-app';
// var MONGODB_URI_DEVELOPMENT = 'mongodb://localhost:27017/TodoApp';

var env = process.env.NODE_ENV || 'development';


if(env == 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    mongoose.connect(process.env.MONGODB_URI, options);
    
}else if(env == 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    mongoose.connect(process.env.MONGODB_URI, options);
}
if(process.env.NODE_ENV == 'production'){
    mongoose.connect(process.env.MONGODB_URI, options);
}

var conn = mongoose.connection; 

conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', () => {
    console.log('Successfully Connected');
    
});
module.exports = { mongoose };