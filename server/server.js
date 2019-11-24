//import * as constants from "../web/src/constants";

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

mongoose.connect(mongoDBURL, {useNewUrlParser: true});

let db = mongoose.connection;

//
// var Web3 = require('web3');
//const ropstenURL = "https://ropsten.infura.io/v3/74a5c337e5d3449384e8f2dad0837ac3";
// var web3 = new Web3(ropstenURL);
// var contractABI = require('./ABI.json');
// const address = "0x518Ab7aEdAeD27Df0eD87457e13B9D1adAeDA735";
// var babCoinContract = new web3.eth.Contract(ABI, '0x3d0a11636d9a3d5852127ea8ba2a77e52f2283b9');


db.once('open', function () {
    console.log("Connected to database successfully!")
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.post("/user", (req, res) => {
    //  req - username, user_email
    // res - status code, user info
    var user_name = req.body.name;
    var user_email = req.body.email;
    var user_eth_address = req.body.userEthAddress;

    var query = User.findOne({'name': user_name, 'email': user_email}, function (err, results) {
        if (results == null) {
            //Create new user:
            let newUser = User({
                name: user_name,
                email: user_email,
                ethAddress: user_eth_address,
                balance: 500,
                total_accrued: 500
            });
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
    var going = req.body.going;
    var eventID = req.body.iCalID;

    const filter = {'email': user_email};

    User.findOne(filter, function (err, user) {
        if (user == null || user.balance < delta) {
            res.sendStatus(400);
            console.log(res);
            return;
        }
        const eventFilter = {"iCalID": eventID};
        Event.findOne(eventFilter, (err, event) => {
            if (event == null) {
                res.sendStatus(400);
                return;
            }
            if (going === 1) {
                user.balance = user.balance - delta;
            } else if (going === 2) {
                user.balance = user.balance - delta / 2;
            }
            console.log(user);

            user.save((err) => {
                console.log(err);
            });

            event.rsvp_map.set(user_email, going);

            event.save((err) => {
                console.log(err);
            });
            res.status(200).send({"user": user, "event": event});
        });
    });


});

server.post("/checkin", (req, res) => {
    var email = req.body.email;
    var ical = req.body.ical;

    const filter = {"iCalID": ical};

    Event.findOne(filter, (err, event) => {
        if (event == null || !event.rsvp_map.contains(email)) {
            res.sendStatus(400);
            return;
        }

        event.attended.push(email);
        event.save((err) => {
            console.log(err);
        });
        res.status(200).send(event);
    });
});

server.post("/createEvent", (req, res) => {
    var iCalID = req.body.event.iCalUID;
    var name = req.body.event.summary;
    var description = req.body.event.description;
    var datetime = req.body.event.start.dateTime; //format: 2016-11-14T20:30:00-08:00 - DATETtime-timezone

    console.log("creating event: " + name);
    if (description === undefined) {
        description = "temp";
    }

    const eventDetails = {
        "iCalID": iCalID,
        "datetime": datetime,
        "name": name,
        "description": description,
        "rsvp_map": {'temp': 3}
    };

    Event.findOne(eventDetails, (err, event) => {
        if (event == null) {
            console.log(eventDetails);
            let event = Event(eventDetails);
            event.save((err) => {
                console.log(err);
            });
            console.log("created event: " + name);
            res.status(200).send({"exists": false});
            return;
        }
        res.status(200).send({"exists": true});
        return;
    });
});

server.post("/setuserbalance", (req, res) => {
    var email = req.body.email;
    var newBalance = req.body.newBalance;
    User.findOne({'email': email}, function (err, user) {
        if (user == null) {
            res.sendStatus(400);
            return;
        }
        user.balance = newBalance;
        user.save((err) => {
            console.log(err);
        });
    });
});

server.get("/eventrespondees", (req, res) => {
    var iCalID = req.body.iCalID;
    Event.findOne({"iCalID": iCalID}, (err, event) => {
        if (event == null) {
            res.sendStatus(400);
            return;
        }
        res.status(200).send(event.rsvp_map);
    });
});

server.post("/rsvpStatus", (req, res) => {
    var userEmail = req.body.email;
    var eventID = req.body.iCalID;
    //console.log(req);

    console.log("email: " + userEmail + ", event: " + eventID);

    Event.findOne({"iCalID": eventID}, (err, event) => {

        if (event == null) {
            res.sendStatus(400);
            return;
        }

        var currentStatus = event.rsvp_map.get(userEmail);

        res.status(200).send({"status": currentStatus});
    });
});

server.listen(port, () => {
    console.log(`server listening at ${port}`);
});
