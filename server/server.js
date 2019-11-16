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
               let newUser = User({name: user_name, email: user_email, balance: 0, total_accrued: 0});
               newUser.save((err) => {
                    res.sendStatus(400);
                    return;
               });

               res.status(200).send(newUser);

          } else {
               res.status(200).send(results);
          }
     });
})

server.post("/rsvp", (req, res) => { // req  -> has new BaBCoin balance for user
     var user_email = req.body.email;
     var newBabCoin = req.body.newBalance;

     const filter = {'email': user_email};
     const update = {'balance':  newBabCoin};

     let doc = User.findOneAndUpdate(filter, update, {
       new: true
     });

     if (doc == null || doc.email == null) {
          res.sendStatus(400);
     }
     res.status(200).send(results);
})

server.listen(port, () =>{
    console.log(`server listening at ${port}`);
});
