var path  = require('path');
var Express  = require('express');
var session =  require('express-session');
var bodyParser = require('body-parser');
var handlebars  = require( 'express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var BeerScoreModel = require('./mongoModels/BeerScoreModel');



// initialize the server
const app = new Express();

const db_user = process.env.DB_USER;
const db_key  = process.env.DB_KEY;
const db_name = process.env.DB_NAME;

const db_url = 'mongodb://'+db_user + ':' + db_key +'@ds141428.mlab.com:41428/'+ db_name;

mongoose.connect(db_url);


// passport for session authentication
app.use(session({ secret: 'beerapp'}));
app.use(passport.initialize());
app.use(passport.session());


// templating with handlebars engine;
var tmplHandlebars = handlebars.create({});
app.engine('handlebars', tmplHandlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use(Express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  // render the index template with the embedded
  return res.render('index');
});


app.post('/login', function(req, res){
    // render the index template with the embedded
    //return res.render('login');
});

app.post('/signup', function(req, res){
    // render the index template with the embedded
    //return res.render('signup');
});





app.get('/scores', function(req, res){
  BeerScoreModel.getAllBeers(

      function(beers, err){
        if(err){
          res.send(err);
        }
        res.send(beers);
      }
  );
});

  // create tasting beer record
app.post('/score', function(req, res){

  // render the index template with the embedded
  BeerScoreModel.createBeerTasting(req.body,
      function(beers, err){
        if(err){
          res.send(err);
        }
        res.send(beers);
      }
  );
});

app.put('/score/:_id', function(req, res){

    // render the index template with the embedded
    BeerScoreModel.editBeerTasting(req.params._id, req.body,
        function(beers, err){
            if(err){
                res.send(err);
            }
            res.send(beers);
        }
    );
});


app.delete('/score/:_id', function(req, res){


    BeerScoreModel.deleteBeerTasting(req.params._id,
        function(beers, err){
            if(err){
                res.send(err);
            }
            res.send(beers);
        }
    );
});


// start the server
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

app.listen( port, function() {

  console.log('Server running on http://localhost: ' + port + '-' + env);
});
