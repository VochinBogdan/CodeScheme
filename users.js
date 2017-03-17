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

}