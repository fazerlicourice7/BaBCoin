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


var Web3 = require('web3');
const ropstenURL = "https://ropsten.infura.io/v3/74a5c337e5d3449384e8f2dad0837ac3";
var web3 = new Web3(ropstenURL);
const address = "0x518Ab7aEdAeD27Df0eD87457e13B9D1adAeDA735";
//var babCoinContract = new web3.eth.Contract(ABI, '0x3d0a11636d9a3d5852127ea8ba2a77e52f2283b9');


db.once('open', function() {
     console.log("Connected to database successfully!")
     var balance = web3.eth.getBalance(address);
     balance.then(function(result) {
          console.log(result)
     });

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
