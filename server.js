var express = require('express');

var app = express();

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
  res.send(projects);
})

app.get('/projects/:id', function (req, res) {
  console.log(req.params);
  var project = projects.find(function (project) {
    return project.id === Number(req.params.id);
  });
  res.send(project);
})

app.listen(3012, function () {
  console.log('API app started');
})
