const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// SEED DATA
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// POST TODOS ROUTE TESTS
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        // expect return val to be equal to the string set in text var above
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        // if no errors fetch all todos
        Todo.find({text}).then((todos) => {
          // expect one item in todos collection
          expect(todos.length).toBe(1);
          // that todo should equal string in var text
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); // data is reset and seeded with beforeEach function above
          done();
        }).catch((e) => done(e));
      });
  });
});

// GET TODOS ROUTE TESTS
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  });
});

// GET TODO/:ID ROUTES TESTS
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        // check if returned todo text matches the text from our seed data
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it ('should return a 404 if todo not found', (done) => {
    // create new id that is not part stored in db
    var hexId = new ObjectID().toHexString();

    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it ('should return 404 for non-object ids', (done) => {
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end(done);
  })
});
