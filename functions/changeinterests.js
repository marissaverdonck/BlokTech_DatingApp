// Require dependencies
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
function changeinterests(req, res) {
  res.render('changeinterests');
}

module.exports = changeinterests;