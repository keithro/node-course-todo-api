const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// ===========
//  FIND TODO
// ===========

var id = '59d50361fc71a3064422371f';

// Validate Id
if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// // find returns an array of matching documents if none match it returns an empty array
// // ------------------------------
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// // findOne returns one document/object if none match it returns 'null'
// // ------------------------------
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   // if (!todo) {
//   //   return console.log('Id not found');
//   // }
//   console.log('Todo', todo);
// });

// does the same thing as findOne w/o having to write query object
// ------------------------------
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e));

// ===========
//  FIND USER
// ===========

// Find user by id 
// ---------------
// // My version
// var userId = '59d2c9d58359251a22a02da0'
// User.findById(userId).then((user) => {
//   if (!user) {
//     return console.log('Unable to find user');
//   }
//   console.log('User by Id', user);
// }).catch((e) => {
//   console.log(e);
// });

// Andrew's version *notice he did not create/pass in variable and did not use .catch. You can use either.
User.findById('59d2c9d58359251a22a02da0').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
