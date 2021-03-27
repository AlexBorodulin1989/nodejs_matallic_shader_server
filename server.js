var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var projects = [
  {
    id: 1,
    name: 'project1'
  },
  {
    id: 2,
    name: 'project2'
  },
  {
    id: 3,
    name: 'project3'
  },
  {
    id: 4,
    name: 'project4'
  },
  {
    id: 5,
    name: 'project5'
  }
];

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

mongoClient.connect('mongodb://localhost:27017', {
     useUnifiedTopology: true,
     useNewUrlParser: true
  }, function (error, database) {
  if (error) {
    return console.log(err);
  }

  db = database.db('metallic_shader');

  app.listen(3012, function () {
    console.log('API did started');
  })
});
