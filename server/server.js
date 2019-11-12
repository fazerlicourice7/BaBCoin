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
     console.log("Connected to database successfully!")
     var query = User.find({'name': 'ilyrobert'}, function (err, results) {
          if (results == null) {
               console.log('yee');

          } else {
               console.log(results);
               //res.send(results);
          }
     });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.post("/user", (req, res) => {
     //  req - username, user_email
     // res - status code, user info
     var user_name = req.body.name;
     var user_email = req.body.email;

     var query = User.findOne({'name': user_name, 'email': user_email}, function (err, results) {
          if (results == null) {
               //Create new user:
               let newUser = User({name: user_name, email: user_email});
               newUser.save((err) => {

               });

          } else {
               console.log(typeof results);
               res.send(results);
          }
     });
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
