const express = require('express');
const server = express();
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./users');
const Event = require('./events');
server.use(bodyParser());
const port = 4000;

var mongoDBURL = 'mongodb+srv://vamshi:vamshitest@babcoin-dyxc1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', function() {
     var query = User.findOne({'name': 'ilyrobert'});
     query.select('name');

     query.exec(function (err, user) {
       if (err) console.log('ouch');
       console.log(user.id);
 });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.post("/user", (req, res) => {
     //  req - username, user_email
     // res -
})

server.get("/", (req, res) => {
    res.send("hello there");

});

server.get("/:url", (req, res) => {
    switch(req.params.url){
        case "lolwhat" :
            res.send("get rekt");
            break;
        case "never_say_never":
            res.send("justin bieber");
            break;
        default:
            res.send(`${req.params.url}`);
            break;
    }
});

server.get("/lolwhat", (req, res) => {
    res.send("get rekt");
});

server.post("/post", (req, res) => {
    console.log('posting');
    res.send(req.body);
});

server.listen(port, () =>{
    console.log(`server listening at ${port}`);
});
