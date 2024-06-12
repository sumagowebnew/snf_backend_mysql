const db = require('../../db');

function getUserByEmail(email, callback) {
  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      console.error('Error in getUserByEmail:', err); // Log the error
    }
    callback(err, results); // Pass both error and results to the callback
  });
}

module.exports = {
  getUserByEmail
};
