module.exports = function (app, db) {
// Create Project with title
function createProject(req, res) {

    // Validation
    if (!req.body.title || !req.body.username) {
        console.log("title and username is required!");
        return res.sendStatus(400);
    }

    // Query to make sure there isn't a user with the same project title and creator username
    var count = db.collection('projects').count({title: req.body.title}, function(err, count) {
        
        // Project title and username already in database
        if (count > 0){ 
            console.log("already in db");
            return res.sendStatus(403);
        }
        
        // Set create JSON
        var createJSON = {};
        createJSON.title = req.body.title;
        createJSON.creator = req.body.username;
        if (req.body.short_desc)
            createJSON.short_desc = req.body.short_desc;
        if (req.body.long_desc)
            createJSON.long_desc = req.body.long_desc;
        if (req.body.num_needed)
            createJSON.num_needed = req.body.num_needed;
        if (req.body.active)
            createJSON.active = req.body.active;
        if (req.body.moderators)
            createJSON.moderators = req.body.moderators;
        if (req.body.members)
            createJSON.members = req.body.members;
        if (req.body.skills_used)
            createJSON.skills_used = req.body.skills_used;
        if (req.body.tags)
            createJSON.tags = req.body.tags;
        if (req.body.github)
            createJSON.github = req.body.github;
        if (req.body.city)
            createJSON.city = req.body.city;
        if (req.body.school)
            createJSON.school = req.body.school;
        
        // Insert into database
        db.collection('projects').insert(createJSON);
        
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
    
    var has_permission = 0, i = 0, moderator_list;
    
    // Find document matching title
    db.collection('projects').findOne({title: req.body.title},       
        
        function(err, project) {
            if (project){
                
                // Make sure they have creator/moderator permission
                if (req.body.username != project.creator){
                    if(project.moderators){
                        moderator_list = (project.moderators).split(", ");
                        while(moderator_list[i]){
                            if(req.body.username == moderator_list[i])
                                has_permission = 1;
                            i++;
                        }
                    }
                }
                else
                    has_permission = 1;
                
                if(!has_permission)
                    return res.sendStatus(401);
                
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
                if (req.body.moderators){
                    if(!project.moderators)
                        editJSON.moderators = req.body.moderators;
                    else
                        editJSON.moderators = project.moderators + ", " + req.body.moderators;
                }
                if (req.body.members){
                    if(!project.members)
                        editJSON.members = req.body.members;
                    else
                        editJSON.members = project.members + ", " + req.body.members;
                }
                if (req.body.skills_used){
                    if(!project.skills_used)
                        editJSON.skills_used = req.body.skills_used;
                    else
                        editJSON.skills_used = project.skills_used + ", " + req.body.skills_used;
                }
                if (req.body.tags){
                    if(!project.tags)
                        editJSON.tags = req.body.tags;
                    else
                        editJSON.tags = project.tags + ", " + req.body.tags;
                }
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
                });
            // If document not found
            }
            else {
                res.sendStatus(404);
            }
        })
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

// Search projects
    function getProjectsSearch(req, res) {
        db.collection('projects').find(req.params).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get projects.");
            } else {
                res.status(200).json(docs);
            }
        });
    }

app.post('/projects', createProject);
app.get('/projects/:title', getProject);
app.get('/projects', getProjectsSearch);
app.put('/projects/:title', editProject);
app.delete('/projects/:title', deleteProject);

}