//http://localhost:3000

const camelCase = require('camel-case');
const express = require('express');
const app = express();
const port = 3000;
//Makes a string (such as a title) URL safe.
const slug = require('slug');
//Ontleed things as json, forms, etc.
const bodyParser = require('body-parser');
//Uploading files in forms
const multer = require('multer');
var find = require('array-find')
var mongo = require('mongodb')

require('dotenv').config()

// Mongodb
var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
mongo.MongoClient.connect(url, function(err, client) {
  if (err)
    throw err
  db = client.db(process.env.DB_NAME)
});

//Folder for uploaded files
var upload = multer({ dest: 'static/upload/' });

//Serve files from the static folder (middleware function)
app.use(express.static('static'));
//urlencoded is what browsers use to send forms
app.use(bodyParser.urlencoded({ extended: true }));
//Use ejs for templating
app.set('view engine', 'ejs');
//Load templates from the 'views' folder
app.set('views', 'views');

// Announce the pages to the browser and render it
app.get('/', function(req, res) {
  res.render('index')
});
app.get('/notifications', function(req, res) {
  res.render('notifications')
});
app.get('/profile', function(req, res) {
  res.render('profile')
});
app.get('/search', function(req, res) {
  res.render('search')
});
app.get('/settings', function(req, res) {
  res.render('settings')
});
app.get('/login', function(req, res) {
  res.render('Login')
});
app.get('/createaccount1', function(req, res) {
  res.render('createaccount1');
});
app.get('/createaccount2' + ':id', function(req, res) {
  res.render('createaccount2')
});
app.get('/createaccount3' + ':id', function(req, res) {
  res.render('createaccount3')
});
app.get('/changeinterests', function(req, res) {
  res.render('changeinterests')
});
app.get('/user1', function(req, res) {
  res.render('user1')
});
app.get('/itsamatch', function(req, res) {
  res.render('itsamatch')
});
// Open page and get all data from data array  
app.get('/list', allusers);
//Handle a post request
app.post('/createaccount1', form1);
app.post('/createaccount2' + ":id", upload.single('profilepicture'), form2)
app.post('/createaccount3' + ":id", upload.single('profilepicture'), form3)

// Go to the profilepage
app.get('/profile' + ':id', finduser);
app.delete('/profile' + ':id', removeuser);
// If no valid URL was found, send the "not-found page"
app.use(function(req, res) {
  res.status(404).render('not-found')
});

function allusers(req, res) {
  db.collection('data').find().toArray(done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('list.ejs', { data: data })
    }
  }
}

// Haal de gegevens uit de data van :id en open het in de pagina (profile)
function finduser(req, res, next) {
  var id = req.params.id
  db.collection('data').findOne({
    _id: new mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('profile', { data: data })
    }
  }
}

function form1(req, res) {
  var id = slug(req.body.email).toLowerCase();
  db.collection('data').insertOne({
    id: id,
    email: req.body.email,
    password: req.body.password
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      //Redirects the browser to the given path
      res.redirect('/createaccount2' + data.insertedId)
      console.log(data.insertedId)

    }
  }
}

function form2(req, res) {
  var id = req.params.id
  db.collection('data').update({
      _id: new mongo.ObjectID(id)
    }, {
      $set: {
        name: req.body.name,
        dateofbirth: req.body.dateofbirth,
        location: req.body.location,
        gender: req.body.gender,
        orientation: req.body.orientation,
        agefrom: req.body.agefrom,
        agetill: req.body.agetill,
        profilepicture: req.file ? req.file.filename : null,
      },
    },
    done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      //Redirects the browser to the given path
      res.redirect('/createaccount3' + id)
      console.log("test")
    }
  }
}

function form3(req, res) {
  var id = req.params.id
  db.collection('data').update({
      _id: new mongo.ObjectID(id)
    }, {
      $set: {
        interest1: req.body.interest1,
        picture1: req.file ? req.file.filename : null,
        interest2: req.body.interest2,
        picture2: req.file ? req.file.filename : null,
        interest3: req.body.interest3,
        picture3: req.file ? req.file.filename : null,
        interest4: req.body.interest4,
        picture4: req.file ? req.file.filename : null,
        interest5: req.body.interest5,
        picture5: req.file ? req.file.filename : null,
        interest6: req.body.interest6,
        picture6: req.file ? req.file.filename : null,
      },
    },
    done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      //Redirects the browser to the given path
      res.redirect('/search')
      console.log("test")
    }
  }
}

// delete data
function removeuser(req, res) {
  var id = req.params.id
  db.collection('data').deleteOne({
    _id: new mongo.ObjectID(id)
  }, done)

  function done(err) {
    if (err) {
      next(err)
    } else {
      res.json({ status: 'ok' })
    }
  }
}


// Gives the portnumber
app.listen(port, function() {
  console.log('The app listening on port ${port}!')
});
/* Bronnen:
dandevri, 2019- mongodb-server - https://github.com/cmda-bt/be-course-18-19/blob/master/examples/mongodb-server/index.js
dandevri, 2019- Express-server - https://github.com/cmda-bt/be-course-18-19/blob/master/examples/express-server/index.js
CMD Be course, 2019- Lecture 2 - https://docs.google.com/presentation/d/1uT6CVMdNig-I9oSwEHI-QiadINH96HYyRC-BIIPxhSI/edit#slide=id.g4e3b0a72ee_0_36
CMD Be course, 2019 - Lecture 3 - https://docs.google.com/presentation/d/137YTmMadaUNCJ2ksKHzU_NCZT-BIv3q9tGhXc38EZ3g/edit#slide=id.g4e3b0a74b9_1_861
*/