//http://localhost:3000

const camelCase = require('camel-case');
const express = require('express');
const app = express();
const port = 3000;
//makes a string (such as a title) URL safe.
const slug = require('slug');
//ontleed things as json, forms, etc.
const bodyParser = require('body-parser');
//uploading files in forms
const multer = require('multer');

var data = [{
    email: 'Marissa',
    password: 27
  },
  {
    email: 'Danny',
    password: 21
  }
];

//folder dor uploaded files
var upload = multer({ dest: 'static/upload/' })

//Serve files from the static folder (middleware function)
app.use(express.static('static'));
//urlencoded is what browsers use to send forms
app.use(bodyParser.urlencoded({ extended: true }));
//Use ejs for templating
app.set('view engine', 'ejs');
//Load templates from the 'views' folder
app.set('views', 'views');


// Gets all gebruikers TEST
app.get('/gebruikers', function(req, res) {
  res.render('gebruikers', { data: data })
});

// Announce the pages to the browser
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
app.get('/createaccount2', function(req, res) {
  res.render('createaccount2')
});
app.get('/createaccount3', function(req, res) {
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


//Handle a post request to /
app.post('/createaccount1', add1);
app.post('/createaccount2', upload.single('profilepicture'), add2)



function add1(req, res) {
  var id = slug(req.body.email).toLowerCase();

  data.push({
    email: req.body.email,
    password: req.body.password

  })
  console.log(data);
  console.log(id);
  //Redirects the browser to the given path
  res.redirect('/createaccount2')
}

function add2(req, res) {
  var id = slug(req.body.name).toLowerCase();

  data.push({
    name: req.body.name,
    dateofbirth: req.body.dateofbirth,
    location: req.body.location,
    gender: req.body.gender,
    orientation: req.body.orientation,
    agefrom: req.body.agefrom,
    agetill: req.body.agetill,
    profilepicture: req.file ? req.file.filename : null,
  })
  console.log(data);
  console.log(id);
  //Redirects the browser to the given path
  res.redirect('/createaccount3')
}
// If no valid URL was found, send the "not-found page"
app.use(function(req, res) {
  res.status(404).render('not-found')
});
// Gives the portnumber
app.listen(port, function() {
  console.log('The app listening on port ${port}!')
});

/* Bronnen:
dandevri, 2019- Express-server - https://github.com/cmda-bt/be-course-18-19/blob/master/examples/express-server/index.js
CMD Be course, 2019- Lecture 2 - https://docs.google.com/presentation/d/1uT6CVMdNig-I9oSwEHI-QiadINH96HYyRC-BIIPxhSI/edit#slide=id.g4e3b0a72ee_0_36
CMD Be course, 2019 - Lecture 3 - https://docs.google.com/presentation/d/137YTmMadaUNCJ2ksKHzU_NCZT-BIv3q9tGhXc38EZ3g/edit#slide=id.g4e3b0a74b9_1_861
*/