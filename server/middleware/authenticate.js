var {User} = require ('./../models/user.js');

// Authentication Middleware
var authenticate = (req, res, next) => {
  // Getting value with req.header
  var token = req.header('x-auth');
  
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};