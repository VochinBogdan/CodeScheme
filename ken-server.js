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
        console.log("username and password combination required");
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.body.username}, {password: req.body.password}]
    }, function(err, count) {
        if (count != 1) {
            console.log("username/password combination does not exist");
            return res.sendStatus(403);
        }

        var user = db.collection('users').findOne(
            {username: req.body.username},
            {
                email: 1,
                following_projects: 1
            }
        );

        return res.json(user);
    });
}


// Delete a user
function deleteUser(req, res) {
    // Check username and password
    if (!req.params.username || !req.body.password) {
        console.log("username and password combination required");
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.params.username}, {password: req.body.password}]
    }, function(err, count) {
        if (count != 1) {
            console.log("username/password combination does not exist");
            return res.sendStatus(403);
        }

        db.collection('users').findOneAndDelete(
            {username: req.params.username}
        );

        console.log("delete success");
        return res.sendStatus(200);
    });
}


// Edit a user's profile information
function editUser(req, res) {
    if (!req.params.username || !req.body.oldPassword) {
        console.log("username and password combination required");
        return res.sendStatus(400);
    }

    var password = db.collection('users').count({
        $and: [{username: req.params.username}, {password: req.body.oldPassword}]
    }, function(err, count) {
        if (count != 1) {
            console.log("username/password combination does not exist");
            return res.sendStatus(403);
        }

        var editJSON = {};
        if (req.body.password) {
            editJSON.password = req.body.password;
        }
        if (req.body.email) {
            editJSON.email = req.body.email;
        }
        if (req.body.skills_learned) {
            editJSON.skills_learned = req.body.skills_learned;
        }
        if (req.body.skills_wanted) {
            editJSON.skills_wanted = req.body.skills_wanted;
        }
        if (req.body.projects) {
            editJSON.projects = req.body.projects;
        }
        if (req.body.following_projects) {
            editJSON.following_projects = req.body.following_projects;
        }
        if (req.body.bio) {
            editJSON.bio = req.body.bio;
        }

        db.collection('users').findOneAndUpdate(
            {username: req.params.username},
            {$set: editJSON}, function(err, result) {
                if (result.hasWriteConcernError()) {
                    console.log("write concern error");
                    return res.sendStatus(403);
                } else if (result.hasWriteError()) {
                    console.log("write error");
                    return res.sendStatus(403);
                }
            }
        );

        console.log("edit success");
        return res.sendStatus(200);
    });
}
