// const MongoClient = require('mongodb').MongoClient;
// destructured version of require above:
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // // DELETE MANY
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // // DELETE ONE
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // // FIND ONE AND DELETE
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // // CHALLENGES
  // db.collection('Users').deleteMany({name: 'Keith'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('59d27ddbe69980184a6cfaf7')
  }).then((result) => {
    console.log(JSON.stringify(results, undefined, 2));
  });

  // db.close();
});