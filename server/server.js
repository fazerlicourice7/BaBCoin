const express = require('express');
const server = express();
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./users');
const Event = require('./events');
server.use(bodyParser());
server.use(cors());
const port = 4000;

var mongoDBURL = 'mongodb+srv://vamshi:vamshitest@babcoin-dyxc1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL, { useNewUrlParser: true });

let db = mongoose.connection;

//
// var Web3 = require('web3');
// const ropstenURL = "https://ropsten.infura.io/v3/74a5c337e5d3449384e8f2dad0837ac3";
// var web3 = new Web3(ropstenURL);
// var contractABI = require('./ABI.json');
// const address = "0x518Ab7aEdAeD27Df0eD87457e13B9D1adAeDA735";
// var babCoinContract = new web3.eth.Contract(ABI, '0x3d0a11636d9a3d5852127ea8ba2a77e52f2283b9');


db.once('open', function() {
     console.log("Connected to database successfully!")
     // var balance = web3.eth.getBalance(address);
     // balance.then(function(result) {
     //      console.log(result)
     // });
     //
     // babCoinContract.methods.createEvent('0x3d0a11636d9a3d5852127ea8ba2a77e52f2283b9', "1123123123", "5").call({
     //      from: '0x3d0a11636d9a3d5852127ea8ba2a77e52f2283b9'
     // });
     // var query = User.find({'name': 'ilyrobert'}, function (err, results) {
     //      if (results == null) {
     //           console.log(web3.eth.getBalance(address, (err, wei) => {
     //                balance = web3.utils.fromWei(wei, 'ether')
     //           }));
     //
     //      } else {
     //           console.log(results, web3.eth.getBalance(address, (err, wei) => {
     //                balance = web3.utils.fromWei(wei, 'ether')
     //           }));
     //           //res.send(results);
     //      }
     // });
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
               let newUser = User({name: user_name, email: user_email, balance: 500, total_accrued: 500});
               newUser.save((err) => {
                    console.log(err);
               });
               if (newUser == null || newUser.name == null) {
                    console.log("EERROOROROR");
                    res.sendStatus(400);
                    return;
               }
               res.status(200).send(newUser);

          } else {
               res.status(200).send(results);
          }
     });
});

server.post("/rsvp", (req, res) => { // req  -> has new BaBCoin balance for user
     var user_email = req.body.email;
     var delta = req.body.amount;

     const filter = {'email': user_email};

     User.findOne(filter, function (err, user) {
          if (user == null || user.balance < delta) {
               res.sendStatus(400);
               return;
          }
          user.balance = user.balance - delta;
          user.save((err) => {
               console.log(err);
          });
          res.status(200).send(user);
     })
});

server.post("/checkin", (req, res) => {
     var email = req.body.email;
     var cal = req.body.ical;

});

server.post("/createEvent", (req, res) => {
     var iCalID = req.body.calID;
     var datetime = req.body.datetime; //format: 2016-11-14T20:30:00-08:00 - DATETtime-timezone
     var name = req.body.name;
     var description = req.body.description;

     let event = Event({iCalID: iCalID, datetime: datetime, name: name, description: description});
     event.save((err) => {
          console.log(err);
     });
     // res.status

});

server.listen(port, () =>{
    console.log(`server listening at ${port}`);
});
