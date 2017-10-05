var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// // need to set local environment variable or use npm dotenv
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/TodoApp');
// var url = process.env.DATABASE_URL || 'mongodb://localhost:27017/TodoApp';
// mongoose.connect(url);

module.exports = {mongoose};