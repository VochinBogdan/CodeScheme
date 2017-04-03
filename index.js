var express = require('express');
app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://heroku_whjcwdgg:f1ka69svljkl22sl98f69jhnm@ds149800.mlab.com:49800/heroku_whjcwdgg';
var db;

// MongoDB connect
MongoClient.connect(mongoURL, function(err, database) {
    console.log(database);
    // Database is ready; listen on port 3000
    app.listen(process.env.PORT || 3000, function () {
        console.log('App listening on port 3000');
    });

    // Users endpoints
    require('./users.js')(app, database);
    // Project endpoints
    require('./projects.js')(app, database);
});

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/html/SignUpPage.html');
});

app.get('/project_search', function(req, res) {
    res.sendFile(__dirname + '/html/ProjectSearch.html');
});

