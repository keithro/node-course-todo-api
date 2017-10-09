const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --------------------
// jwt.sign - takes object and your secret code to sign - creates hash and returns token value
// jwt.verify - takes token and your secret code to verify that it was not manipulated by comparing to 
// (see below under 'SHA256 ONLY')
// --------------------

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$Y4Q96Vb2MnxLToBZUmkaUOOjsRi65IVRmNyA/bjrapJcX2DSZKifi';

// comparing password to hashed password, should get true
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


// // ---------------
// //   SHA256 ONLY
// // ---------------
// var data = {
//   id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }


// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }