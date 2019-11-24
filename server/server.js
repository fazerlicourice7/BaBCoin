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
import Web3 from "web3";
import * as constants from "../web/src/constants";

const web3 = new Web3("ropsten.infura.io/v3/74a5c337e5d3449384e8f2dad0837ac3");

const BabCoinContract = new web3.eth.Contract(
    constants.BABCoinABI,
    constants.contractAddress
);

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
            } else if (going === 2){
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
    var iCalID = req.body.icalUID;
    var datetime = req.body.start.datetime; //format: 2016-11-14T20:30:00-08:00 - DATETtime-timezone
    var name = req.body.summary;
    var description = req.body.description;

    const eventDetails = {"iCalID": iCalID, "datetime": datetime, "name": name, "description": description};

    Event.findOne(eventDetails, (err, event) => {
        if (event == null) {
            let event = Event(eventDetails);
            event.save((err) => {
                console.log(err);
            });
            res.status(200).send({"exists": false});
        }
        res.status(200).send({"exists": true});
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

server.get("/rsvpstatus", (req, res) => {
    var userEmail = req.email;
    var eventID = req.event;

    Event.findOne({"event": eventID}, (err, event) => {

        if (event == null) {
            res.sendStatus(400);
            return;
        }

        var currentStatus = event.rsvp_map.get(userEmail);

        res.status(200).send({"status": currentStatus});
    });
});



server.get("/getUserDelta", (req, res) => {
    var iCalID = req.body.iCalID;
    Event.findOne({"iCalID": iCalID}, (err, event) => {
        if (event == null) {
            res.sendStatus(400);
            return;
        }
        var eventResponses = event.rsvp_map;
        var attendees = event.attended;

        attendees.forEach(function (item, index) {
            var staked = event.rsvp_map;
            if (rsvpStatus == 1) {
                staked = 10;
            } else if (rsvpStatus == 2) {
                staked = 5;
            } else {
                staked = 0;
            }
            var ratio = staked / attendeePool;

            return ratio * FinalPool;
        });
    });

    BabCoinContract.methods.getPoolAmount().call().then(poolAmount => {
        var FinalPool = poolAmount;
    });

    var attendeePool = 0;

    function addToAttendeePool(rsvpStatus, email, map) {
        if (rsvpStatus == 1) {
            attendeePool += 10;
        }
        else if (rsvpStatus == 2) {
            attendeePool = 5;
        }
        else {
            attendeePool = 0;
        }
    }

    eventresponses.prototype.forEach(addToAttendeePool);
});

server.listen(port, () => {
    console.log(`server listening at ${port}`);
});
