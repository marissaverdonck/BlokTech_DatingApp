//http://localhost:3000

const camelCase = require('camel-case')
const express = require('express')
const app = express()
const port = 3000

//Serve files from the static folder
app.use(express.static('static'));
//Use ejs for templating
app.set('view engine', 'ejs');
//Load templates from the 'views' folder
app.set('views', 'views');

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
app.get('/about', function(req, res) {
    res.render('About')
});
app.get('/login', function(req, res) {
    res.render('Login')
});
app.get('/createaccount1', function(req, res) {
    res.render('createaccount1')
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
// If no valid URL was found, send the "not-found page"
app.use(function(req, res) {
    res.status(404).render('not-found')
});

// Gives the portnumber
app.listen(port, function() {
    console.log('The app listening on port ${port}!')
});

/* (voorbeeld)
//Render by combining templates with data, send the result
function movies(req, res) {
  res.render('index', {data: data})
}
*/

/* Bronnen:
Be course - Lecture 2 - https://docs.google.com/presentation/d/1uT6CVMdNig-I9oSwEHI-QiadINH96HYyRC-BIIPxhSI/edit#slide=id.g4e3b0a72ee_0_36
Express - https://expressjs.com/en/starter/static-files.html */