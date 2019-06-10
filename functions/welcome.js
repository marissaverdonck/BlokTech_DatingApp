// Require dependencies
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const session = require('express-session');
var upload = multer({ dest: 'static/upload/' });
var db = null;
require('dotenv').config();
var url = process.env.DB_HOST
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