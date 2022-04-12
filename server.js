// requiring all necesssary packages
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Contact = require('./models/Contact');
var User = require('./models/User');
var Pet = require('./models/Pet');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var { isAuth } = require('./middleware/isAuth');
var session = require('express-session');
require('./middleware/passport')(passport);
var multer = require("multer");

//save image correctly instead of binary 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(uniqueSuffix);
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })


var upload = multer ({storage: storage });
var Image = require("./models/Image.js");

// console.log(dogs);

//establishing handlbars structure
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
     layoutsDir: __dirname + '/views/layouts',
     extname: 'hbs'
}));

//making folders public
app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));
app.use(
    session({
        secret: 'mySecret',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 6000000 }
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//presenting the index page with the main layout
app.get('/dashboard', isAuth, (req, res) => {
    Pet.find({}).lean()
    .exec((err, pets) =>{
        if(pets.length){
            res.render('dashboard', {layout: 'main', pets: pets, petsExist: true }); 
        } else{
            res.render('dashboard', {layout: 'main', pets: pets, petsExist: false}); 
        }
    });
    //to find a specific thing
    //Contact.find({name: 'Claire'}).lean()
});


app.get('/profile', isAuth, (req, res) =>{
    res.render('profile', {layout: 'main', name: req.user.name, username: req.user.username });
});

app.get('/social', (req, res) =>{
    Pet.find({ user: req.user.id }).lean()
    .exec((err, pets) =>{
    res.render('social', {layout: 'main' });
});



// app.post('/addImage', upload.single('image'), function (req, res, next) {
//     const {title, description } = req.body;
//     var imageUpload = new Image({
//         title,
//         description,
//         path: '/uploads/' + req.file.filename
//     })
//     imageUpload.save();
//     res.redirect('/dashboard');
//   });


//   app.get('/getImages', (req, res)=>{
//     Image.find({}, (err, docs)=>{
//         if (err) throw err;
//         res.send(docs);
//     })
//   })


  app.get('/getPets', (req, res)=>{
    Pet.find({adoptable: true }, (err, docs)=>{
        if (err) throw err;
        res.send(docs);
    })
  })


//login page
app.get('/', (req, res) => {
    res.render('login', { layout: 'main'});
});

//sending data to the database
app.post('/signup', async (req, res) =>{
    const { name, username, password } = req.body;
    try{
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).render('login', {layout: 'main', userExist: true});
        }
        user = new User({
            name,
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
            failureRedirect: '/?incorrectLogin'
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
        user: req.user.id,
        name,
        email,
        number
    });
    contact.save();
    res.redirect('/dashboard?contactSaved');
});



app.post('/addPet', upload.single('image'), function (req, res, next){
    const { petName, adoptable, category, breed, species, age, size, hypo, sex, description, title, comment } = req.body;
    var pet = new Pet({
        user: req.user.id,
        petName,
        adoptable,
        category,
        breed,
        species,
        age,
        size,
        hypo,
        sex,
        description,
        title,
        comment,
        path: '/uploads/' + req.file.filename
    });
    pet.save();
    res.redirect('/profile?saved');
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




