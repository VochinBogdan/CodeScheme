module.exports = function (app, db) {
    console.log(db + "\n");

    // Create User with username, email and password
    app.post('/users', function (req, res) {

        // Check required attributes are there
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.sendStatus(400);
        }

        // Query to make sure there isn't a user with the same username or email
        var count = db.collection('users').count({
            $or: [{email: req.body.email}, {username: req.body.username}]
        }, function(err, count) {

            // Email or username already in database
            if (count > 0){
                return res.sendStatus(403);
            }

            // Insert into database
            db.collection('users').insert({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                github: null,
                skills_known: [],
                skills_wanted: [],
                bio: null,
                city: null,
                school: null,
                projects: [],
                past_projects: [],
                following_projects: []
            });

            res.send(req.body.username + ' created');
        });
    })

    // Get a user's profile info by username
    app.get('/users/:username', function(req, res){

        // Find document matching username
        db.collection('users').findOne(
            { username: req.params.username },
            {
                username: 1,
                github: 1,
                skills_known: 1,
                skills_wanter: 1,
                bio: 1,
                city: 1,
                school: 1,
                projects: 1,
                past_projects: 1 },
            function(err, user){
                // If found, return document
                if (user){
                    res.json(user);
                // If document not found
                } else {
                    res.sendStatus(404);
                }

            })
    })

    // Get a user's email and projects following, and projects they are a part of
    app.get('/user/:username/private', function(req, res) {
        // Check username
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
            }
        );
    })

    // Delete a user
    app.delete('/user/:username', function(req, res) {
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

            // Delete all projects user is a creator of.
            db.collection('projects').deleteMany({creator:req.body.username});

            // Delete the user.
            db.collection('users').findOneAndDelete(
                {username: req.params.username}
            );

            console.log("delete success");
            return res.sendStatus(200);
        });
    })

    app.put('/user/:username', function(req, res) {
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
    })
}
