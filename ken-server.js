var express = require('express');
app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/codescheme';
var db;

// MongoDB connect
MongoClient.connect(mongoURL, function(err, database) {
  db = database;
  // Database is ready; listen on port 3000
  app.listen(3000, function () {
    console.log('App listening on port 3000');
  });
});

// Get a user's email and projects following
function getEmailProjects(req, res) {
    // Check username and password
    if (!req.body.username || !req.body.password) {
        console.log(req);
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.body.username}, {password: req.body.password}]
    }, function(err, count) {
        if (count != 1) {
            return res.sendStatus(403);
        }

        var user = db.collection('users').findOne(
            {username: req.body.username},
            {
                email: 1,
                following_projects: 1
            }
        );

        res.json(user);
    });
}


// Delete a user
function deleteUser(req, res) {
    // Check username and password
    if (!req.params.username || !req.body.password) {
        console.log(req);
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.params.username}, {password: req.body.password}]
    }, function(err, count) {
        if (count != 1) {
            return res.sendStatus(403);
        }

        db.collection('users').findOneAndDelete(
            {username: req.params.username}
        );

        res.send(req.params.username + ' deleted');
    });
}


// Edit a user's profile information
function editUser(req, res) {
    if (!req.params.username || !req.body.oldPassword) {
        console.log(req);
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.params.username}, {password: req.body.oldPassword}]
    }, function(err, count) {
        if (count != 1) {
            return res.sendStatus(403);
        }

        db.collection('users').findOneAndUpdate(
            {username: req.params.username},
            {$set:
                ???
            }
        );

        res.send(req.params.username + ' modified');
    });
}
