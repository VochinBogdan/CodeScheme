/**
 * Set up server
 */
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

/**
 * Search
 */

// Search by project name
function searchProjectName(req, res){
    // Check required attributes are there
    if (!req.body)
        return res.sendStatus(400);

}

app.get('/projects/:pid', searchProjectName);

