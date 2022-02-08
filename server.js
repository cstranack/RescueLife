// requiring all necesssary packages
var express = require('express');
// const { engine } = require('express-handlebars');
var app = express();
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
     layoutsDir: __dirname + '/views/layouts',
     extname: 'hbs'
}));

//web application getting something from the server
//req = request //res = response //=>'fat arrow' = function
//presenting the index page with the main layout
app.get('/', (req, res) => {
    res.render('index', {layout: 'main'}); 
});

//second page
app.get('/profile', (req, res) => {
    res.send('This is the profile page :D ');

});


mongoose.connect('mongodb://localhost:27017/handlebars', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('connected to the DB ');
})
.catch((err) => {
    console.log('Not connected to DB with err :' + err);
});



//listening for requests on port 3000
app.listen(3000,() => {
    console.log(' Server listening on port 3000 :) ');
});
