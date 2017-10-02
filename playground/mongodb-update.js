// const MongoClient = require('mongodb').MongoClient;
// destructured version of require above:
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // // FIND ONE AND UPDATE
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59d29eb1fb9dcbd8e8c1ee6e')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59d27d9baf9a7818465298a0')
  }, {
    $set: {
      name: 'Keith'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  });

  // db.close();
});