var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
var mongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID
const config = require('./config/db');
const account = require('./routes/account')

var app = express();
var db;

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
  console.log("Successfully connected to db");
})

mongoose.connection.on('error', (err) => {
  console.log("Not connected to db: " + error);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Main!');
})

app.use('/account', account);

app.get('/projects', function (req, res) {
  console.log('get');
  db.collection('projects').find().toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs)
  })
})

app.get('/projects/:id', function (req, res) {
  console.log('get');
  db.collection('projects').findOne({ _id: objectID(req.params.id) }, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc)
  })
})

app.post('/projects', function (req, res) {
  try{
    db.collection('projects').insertMany(req.body);
    res.sendStatus(200);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
});

app.put('/projects/:id', function (req, res) {
  var project = projects.find(function (project) {
    return project.id === Number(req.params.id);
  });
  project.name = req.body.name
  res.sendStatus(200);
})

app.delete('/projects', function (req, res) {
  console.log(req.body);
  try {
    var query = { _id: { $in: req.body } };
    db.collection("projects").deleteMany(query);
    res.sendStatus(200);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }

})
/*
mongoClient.connect('mongodb://localhost:27017', {
     useUnifiedTopology: true,
     useNewUrlParser: true
  }, function (error, database) {
  if (error) {
    return console.log(err);
  }

  db = database.db('metallic_shader');

  app.listen(port, () => {
    console.log('API did started');
  })
});*/

app.listen(port, () => {
  console.log('API did started');
})
