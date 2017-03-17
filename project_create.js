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

// Create Project with title
function createProject(req, res) {

    // Validation
    if (!req.body.title || !req.body.username) {
        console.log("title and username is required!");
        return res.sendStatus(400);
    }

    // Query to make sure there isn't a user with the same project title and creator username
    //var count = db.collection('projects').count({
    //    $and: [{title: req.body.title}, {username: req.body.username}]
    //}, function(err, count) {
    var count = db.collection('projects').count({title: req.body.title}, function(err, count) {
        
        // Project title and username already in database
        if (count > 0){ 
            console.log("already in db");
            return res.sendStatus(403);
        }
        
        // Check for optional parameters
        var v_short_desc, v_long_desc, v_moderators, v_members, v_num_needed, v_skills, v_git, v_tags, v_city, v_school;
       
       // short_desc
        if(req.body.short_desc)
            v_short_desc = req.body.short_desc;
        else
            v_short_desc = "";
        // long_desc
        if(req.body.long_desc)
            v_long_desc = req.body.long_desc;
        else
            v_long_desc = "";
        // moderators
        if(req.body.moderators)
            v_moderators = req.body.moderators;
        else
            v_moderators = "";
        // members
        if(req.body.members)
            v_members = req.body.members;
        else
            v_members = "";
        // num_needed
        if(req.body.num_needed)
            v_num_needed = req.body.num_needed;
        else
            v_num_needed = "";
        // skills_used
        if(req.body.skills_used)
            v_skills = req.body.skills_used;
        else
            v_skills = "";
        // github
        if(req.body.github)
            v_git = req.body.github;
        else
            v_git = "";
        // tags
        if(req.body.tags)
            v_tags = req.body.tags;
        else
            v_tags = "";
        // city
        if(req.body.city)
            v_city = req.body.city;
        else
            v_city = "";
        // school
        if(req.body.school)
            v_school = req.body.school;
        else
            v_school = "";
       
        // Insert into database
        db.collection('projects').insert({
            title: req.body.title,
            short_desc: v_short_desc,
            long_desc: v_long_desc,  //optional
            creator: req.body.username,
            //moderators: v_moderators, //optional []
            //members: v_members, //optional []
            num_needed: v_num_needed, //optional
            active: true, //default TRUE upon creation
            //skills_used: v_skills,    // optional []
            github: v_git, //optional
            //tags: v_tags,   //optional []
            city: v_city, //optional
            school: v_school
        });
        res.send(req.body.title + ' created');
    });
    
}

// Get a project's profile info
function getProject(req, res) {
    
    // Find document matching title
    db.collection('projects').findOne({title: req.params.title},       
        
        function(err, project) {
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
    if (!req.body.title || !req.body.username)
        return res.sendStatus(400);
    
    var projectInfo;
    // edit to call function??
    /*getProject(req, res) {
        
    }*/
    
    // Find document matching title
    db.collection('projects').findOne({title: req.body.title},       
        
        function(err, project) {
            if (project){
                
                projectInfo = project;
                
                // Make sure they have creator/moderator permission
                if (req.body.username != projectInfo.creator){
                    // would need to use loop to go through the moderator list and check
                    if(req.body.username != projectInfo.moderator)
                        return res.sendStatus(401);
                }
                
                // Check for optional parameters
                var v_short_desc, v_long_desc, v_moderators, v_members, v_num_needed, v_skills, v_git, v_tags, v_city, v_school;
               
               // short_desc
                if(req.body.short_desc)
                    v_short_desc = req.body.short_desc;
                else
                    v_short_desc = projectInfo.short_desc;
                // long_desc
                if(req.body.long_desc)
                    v_long_desc = req.body.long_desc;
                else
                    v_long_desc = projectInfo.long_desc;
                // moderators
                if(req.body.moderators)
                    v_moderators = req.body.moderators;
                else
                    v_moderators = projectInfo.moderators;
                // members
                if(req.body.members)
                    v_members = req.body.members;
                else
                    v_members = projectInfo.members;
                // num_needed
                if(req.body.num_needed)
                    v_num_needed = req.body.num_needed;
                else
                    v_num_needed = projectInfo.num_needed;
                // skills_used
                if(req.body.skills_used)
                    v_skills = req.body.skills_used;
                else
                    v_skills = projectInfo.skills_used;
                // github
                if(req.body.github)
                    v_git = req.body.github;
                else
                    v_git = projectInfo.github;
                // tags
                if(req.body.tags)
                    v_tags = req.body.tags;
                else
                    v_tags = projectInfo.tags;
                // city
                if(req.body.city)
                    v_city = req.body.city;
                else
                    v_city = projectInfo.city;
                // school
                if(req.body.school)
                    v_school = req.body.school;
                else
                    v_school = projectInfo.school;
                
                // Update
                db.collection('projects').updateOne({
                    title: req.body.title}, 
                    { 
                        $set: {
                            short_desc: v_short_desc,
                            long_desc: v_long_desc,  //optional
                            //creator: req.body.username,
                            moderators: v_moderators, //optional []
                            members: v_members, //optional []
                            num_needed: v_num_needed, //optional
                            active: true, //default TRUE upon creation
                            skills_used: v_skills,    // optional []
                            github: v_git, //optional
                            tags: v_tags,   //optional []
                            city: v_city, //optional
                            school: v_school             
                        } 
                    },
                function(err, result) {
                    if (result.matchedCount == 1) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(403);
                    }
                });
            // If document not found
            }
            else {
                res.sendStatus(404);
            }
        })    
        
    /*
    // Set edit JSON
    var editJSON = {};
    if (req.body.short_desc)
        editJSON.short_desc = req.body.short_desc;
    if (req.body.long_desc)
        editJSON.long_desc = req.body.long_desc;
    if (req.body.num_needed)
        editJSON.num_needed = req.body.num_needed;
    if (req.body.active)
        editJSON.active = req.body.active;
    //if (req.body.creator)
    //    editJSON.creator = req.body.creator;
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
        title: req.body.title}, { $set: editJSON },
    function(err, result) {
        if (result.matchedCount == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    });*/
    
    
}

// Delete project
function deleteProject(req, res) {
    // Check required attributes are there
    if (!req.body.title || !req.body.username)
        return res.sendStatus(400);
    
    // Find document matching title
    db.collection('projects').findOne({title: req.body.title},       
        
    function(err, project) {
        if (project){
            
            // Make sure they have creator/moderator permission
            if (req.body.username != project.creator){
                return res.sendStatus(401);
            }
            // Delete Project
            db.collection('projects').deleteOne({title: req.params.title},
            function(err, result) {
                if (result.deletedCount != 1) {
                    // A project was not deleted
                    return res.sendStatus(403);
                }
                res.sendStatus(200);
            });
        }
        else {
            return res.sendStatus(404);
        }
    });
    
}

app.post('/projects', createProject);
app.get('/projects/:title', getProject);
app.put('/projects/:title', editProject);
app.delete('/projects/:title', deleteProject);
