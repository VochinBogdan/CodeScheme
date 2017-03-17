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

// Get a user's email and projects following, and projects they are a part of
function getEmailProjects(req, res) {
    // Check username and password
    if (!req.params.username) {
        console.log("username required");
        return res.sendStatus(400);
    }

    var count = db.collection('users').count(
        {username: req.params.username},
        function(err, count) {
        if (count != 1) {
            console.log("count: " + count);
            console.log("username does not exist");
            return res.sendStatus(404);
        }

        db.collection('users').findOne(
            {username: req.params.username},
            {
                email: 1,
                following_projects: 1,
                projects: 1
            }, function(err, user) {
                if (user) {
                    res.json(user);
                } else {
                    return res.sendStatus(404);
                }
            }
        );
    });
}


// Delete a user
function deleteUser(req, res) {
    // Check username and password
    console.log(req.params.username);
    console.log(req.body.password);
    if (!req.params.username || !req.body.password) {
        console.log("username required");
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

    var existingEmail = 0;

    db.collection('users').count({
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
        if (req.body.skills_known) {
            editJSON.skills_known = req.body.skills_known;
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
        if (req.body.github) {
            editJSON.github = req.body.github;
        }
        if (req.body.city) {
            editJSON.city = req.body.city;
        }
        if (req.body.school) {
            editJSON.school = req.body.school;
        }
        if (req.body.email) {
            db.collection('users').count({email: req.body.email},
                function(err, count) {
                    if (count > 0) {
                        console.log("email already exists");
                        return res.sendStatus(403);
                    } else {
                        editJSON.email = req.body.email;
                        db.collection('users').findOneAndUpdate(
                            {username: req.params.username},
                            {$set: editJSON}
                        );
                        console.log("edit success");
                        return res.sendStatus(200);
                    }
                }
            );
        } else {
            db.collection('users').findOneAndUpdate(
                {username: req.params.username},
                {$set: editJSON}
            );

            console.log("edit success");
            return res.sendStatus(200);
        }
    });
}

app.get('/user/:username/private', getEmailProjects);
app.delete('/user/:username', deleteUser);
app.put('/user/:username', editUser);
