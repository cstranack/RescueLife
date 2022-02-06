var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));

//web application getting something from the server
//req = request //res = response //=>'fat arrow' = function
//presenting the index page with the main layout
app.get('/', (req, res) => {
    res.render('index', {layout: 'main'}); 

});
//second page
app.get('/about', (req, res) => {
    res.send('This is the about page :D ');

});

//third page
app.get('/contact', (req, res) => {
    res.send('This is the contact page :D ');

});


//listening for requests on port 3000
app.listen(3000,() => {
    console.log(' Server listening on port 3000 :) ');
});