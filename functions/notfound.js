// Require dependencies
const express = require('express');
const app = express();
var slug = require('slug')
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const mongo = require('mongodb');
var upload = multer({ dest: 'static/upload/' });
require('dotenv').config();
var url = process.env.DB_HOST;
mongo.MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if (err)
    throw err
  db = client.db(process.env.DB_NAME)
});
// Function
function notfound(req, res) {
  res.status(404).render('not-found')
}

module.exports = notfound;