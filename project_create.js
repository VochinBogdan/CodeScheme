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

// Create Project with title, username (creator)
function createProject(req, res) {

    // Validation
    if (!req.body.title || !req.body.username) {
        console.log("title and username are required!");
        return res.sendStatus(400);
    }

    // Query to make sure there isn't a user with the same project title and creator username
    var count = db.collection('projects').count({
        $or: [{title: req.body.title}, {username: req.body.username}]
    }, function(err, count) {

        // Project title and username already in database
        if (count > 0){ 
            return res.sendStatus(403);
        }

        // Insert into database
        db.collection('projects').insert({
            title: req.body.title,
            short_desc: req.body.short_desc,
            long_desc: req.body.long_desc,  //optional
            creator: req.body.username,
            moderators: [], //optional
            members: [], //optional
            num_needed: req.body.num_needed, //optional
            active: true, //default TRUE upon creation
            skills_used: [],    // optional
            github: null, //optional
            tags: [],   //optional
            city: null, //optional
            school: null    //optional
        });
    });
    
        //console.log(req.body.title);
        //console.log(req.body.username);
}

// Get a project's profile info
function getProject(req, res) {
    
    // Find document matching pid
    db.collection('projects').findOne({ 
    _id: parseInt(req.params.pid)},        
        {    
            title: 1,
            short_desc: 1,
            long_desc: 1,
            creator: 1,
            moderators: 1,
            members: 1,
            num_needed: 1,
            active: 1,
            skills_used: 1,
            github: 1,
            tags: 1,
            city: 1,
            school: 1
        },
        function(err, project){
            // If found, return document
            if (project){
                res.json(project);
            // If document not found
            } else {
                res.sendStatus(404);
            }

        })    
}

function editProject(req, res) {
    // Check required attributes are there
    if (!req.body.pid)
        return res.sendStatus(400);
    // Make sure they have creator/moderator permission
    if (!req.creator && !req.moderator)
        return res.sendStatus(401);
    
    // Set edit JSON
    var editJSON = {};
    if (req.body.title)
        editJSON.title = req.body.title;
    if (req.body.short_desc)
        editJSON.short_desc = req.body.short_desc;
    if (req.body.long_desc)
        editJSON.long_desc = req.body.long_desc;
    if (req.body.num_needed)
        editJSON.num_needed = req.body.num_needed;
    if (req.body.active)
        editJSON.active = req.body.active;
    if (req.body.creator)
        editJSON.creator = req.body.creator;
    if (req.body.moderators)
        editJSON.moderators = req.body.moderators;
    if (req.body.members)
        editJSON.members = req.body.members;
    if (req.body.skills_used)
        editJSON.skills_used = req.body.skills_used;
    if (req.body.tags)
        editJSON.tags = req.body.tags;
    if (req.body.github)
        editJSON.github = req.body.github;
    if (req.body.city)
        editJSON.city = req.body.city;
    if (req.body.school)
        editJSON.school = req.body.school;
    // Update
    db.collection('projects').updateOne({
        _id: parseInt(req.params.pid)
    }, { $set: editJSON },
    function(err, result) {
        if (result.matchedCount == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    });
    
}

// Delete project
function deleteProject(req, res) {
    // Check required attributes are there
    if (!req.body.pid)
        return res.sendStatus(400);
    // Verify that user has permissions to delete
    if (!req.creator)
        return res.sendStatus(401);
    
    // Delete Project
    db.collection('projects').deleteOne({
        _id: parseInt(req.params.pid)},
    function(err, result) {
        if (result.deletedCount != 1) {
            // A project was not deleted
            return res.sendStatus(403);
        }
    });
}

app.post('/projects', createProject);
app.get('/projects/:pid', getProject);
app.put('/projects/:pid', editProject);
app.delete('/projects/:pid', deleteProject);
