// Require dependencies
const express = require('express');
const app = express();
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
function form3(req, res) {
  var id = req.params.id
  db.collection('data').update({
      _id: new mongo.ObjectID(id)
    }, {
      $set: {
        interests: req.body.interest,
        pictures: req.files,
      },
    },
    done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      //Redirects the browser to the given path
      res.redirect('/')
    }
  }
}

module.exports = form3;