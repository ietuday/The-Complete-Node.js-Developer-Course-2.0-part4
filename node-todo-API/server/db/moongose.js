var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://uday:uday123456@ds145043.mlab.com:45043/node-app';
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection; 

conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', () => {
    console.log('Successfully Connected');
    
});
module.exports = { mongoose };