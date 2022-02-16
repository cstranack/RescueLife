// requiring all necesssary packages
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Contact = require('./models/Contact');
var User = require('./models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var { isAuth } = require('./middleware/isAuth');
var session = require('express-session');
require('./middleware/passport')(passport);

//establishing handlbars structure
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
     layoutsDir: __dirname + '/views/layouts',
     extname: 'hbs'
}));

app.use(express.static('public'));
app.use(session({
    secret: 'mySecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//presenting the index page with the main layout
app.get('/dashboard', isAuth, (req, res) => {
    Contact.find({}).lean()
    .exec((err, contacts) =>{
        if(contacts.length){
            res.render('dashboard', {layout: 'main', contacts: contacts, contactsExist: true, username: req.user.username }); 
        } else{
            res.render('dashboard', {layout: 'main', contacts: contacts, contactsExist: false}); 
        }
    });
    //to find a specific thing
    //Contact.find({name: 'Claire'}).lean()
});

//login page
app.get('/', (req, res) => {
    res.render('login', { layout: 'main'});
});

//sending data to the database
app.post('/signup', async (req, res) =>{
    const { username, password } = req.body;
    try{
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).render('login', {layout: 'main', userExist: true});
        }
        user = new User({
            username,
            password
        });
        //password encryption 
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).render('login', {layout: 'main', userDoesNotExist: true});
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/signin', (req, res, next) => {
    try{
        passport.authenticate('local',{
            successRedirect: '/dashboard',
            failureRedirect: '/'
        })(req, res, next);
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/signout', (req, res) =>{
    req.logout();
    res.redirect('/');
});

//sending data to the database
app.post('/addContact', (req, res) =>{
    const { name, email, number } = req.body;
    var contact = new Contact({
        name,
        email,
        number
    });
    contact.save();
    res.redirect('/dashboard');
});


mongoose.connect('mongodb://localhost:27017/RescueLife', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to the DB ')
    })
    .catch((err) => {
        console.log('Not connected to DB with err :' + err);
    });



//listening for requests on port 3000
app.listen(3000,() => {
    console.log('Server listening on port 3000 :) ');
});
