// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/contactlist', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true  
});

// on connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database mongodb @ 27017');
});

// if error in connection
mongoose.connection.on('error', function(err) {
    if(err) {
        console.log('Error in database connection: ' + err);
    }
});


// port number
const port = 3000;

// adding middleware - cors
app.use(cors());

// body-parser
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route); // If we would have any request like /api/anything.. it'll get transfered to route.js

// testing server
app.get('/', function(req, res) {
    res.send('Working!');
});

app.listen(port, function() {
    console.log('Server started at port: ' + port);
});