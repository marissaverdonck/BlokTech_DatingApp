// Require dependencies
const mongo = require('mongodb');
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
require('dotenv').config();
mongo.MongoClient.connect(url, function(err, client) {
  if (err)
    throw err
  db = client.db(process.env.DB_NAME)
});

// Function
function welcome(req, res) {
  db.collection('data').find().toArray(done);

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('index', { data: data, user: req.session.user });
    }
  }
}

module.exports = welcome;