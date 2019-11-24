import './Home.css';
import React, {Component} from 'react';
import Profile from '../components/Profile/Profile'
import EventList from '../components/EventList/EventsList'
import {calendarID} from "../apiGoogleconfig.json";
import Web3 from "web3";
import * as constants from "../constants";

const axios = require('axios');

const web3 = new Web3(window.ethereum);

window.ethereum.enable().catch(error => {
    // User denied account access
    console.log(error)
});

const BabCoinContract = new web3.eth.Contract(
    constants.BABCoinABI,
    constants.contractAddress
);

class Home extends Component {


    constructor(props) {
        super(props);
        //alert('test');
        this.getEvents();
        this.state = {
            "email": this.props.location.state.email

        };
        this.handleUpdateBalance = this.handleUpdateBalance.bind(this);
        this.uploadEvents = this.uploadEvents.bind(this);
    }

    componentDidMount() {
        web3.eth
            .getAccounts()
            .then(addr => {
                this.setState({userEthAddress: addr[0]});
            })
            .then(() => {
                console.log("useraddress", this.state.userEthAddress);
                this.getCoinFromServer(this.props.location.state.email);
            });
        this.render();
    }

    getCoinFromServer(userEmail) {
        BabCoinContract.methods
            .initUser()
            .send({from: this.state.userEthAddress})
            .then(() => {
                var userName = userEmail.split("@")[0];
                console.log(userName);
                axios.post("http://localhost:4000/user", {
                    origin: "http://localhost:3000",
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    mode: 'no-cors',
                    "name": userName,
                    "email": userEmail,
                    "userEthAddress": this.state.userEthAddress
                }).then(res => {
                    this.setState({
                        coin: res.data.balance,
                        totalCoin: res.data.total_accrued
                    });
                });
            });
    }

    getUserDetails() {
        var NAME = 'Vamshi';
        var EMAIL = 'vamshi.balanaga@berkeley.edu';

        this.userName = window.gapi.client.people.people.get({
            headers: {'Access-Control-Allow-Origin': '*'},
            mode: 'no-cors',
            resourceName: 'user/me',
            personFields: "names"
        }).then((res) => {
            this.userName = res.names.displayName;
        }).catch((err) => {
            console.log(err);
        });

        this.userEmail = window.gapi.client.people.people.get({
            headers: {'Access-Control-Allow-Origin': '*'},
            mode: 'no-cors',
            resourceName: 'user/me',
            personFields: "emailAddresses"
        }).then((res) => {
            this.userEmail = res.emailAddresses.value;
        }).catch((err) => {
            console.log(err);
        });

        //console.log("email: " + JSON.parse(userEmail));


        return {
            //name: userName.names.displayName,
            name: NAME,
            //email: userEmail.emailAddresses.value,
            email: EMAIL,
            coin: this.coin
        };
    }

    handleUpdateBalance(newBalance) {
        this.setState({"coin": newBalance});
    }

    getEvents() {
        var comp = this;
        window.gapi.client.calendar.events.list({
            'calendarId': calendarID,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            if (events.length > 0) {
                comp.setState({"events": events});
                comp.uploadEvents(events);
            } else {
                return ['No upcoming events found.'];
            }
        });
    }

    uploadEvents(events) {
        for (var i = 0; i < events.length; i++) {
            const calEvent = events[i];
            console.log("trying to upload: " + JSON.stringify(calEvent));
            axios.post("http://localhost:4000/createEvent", {
                origin: "http://localhost:3000",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'no-cors',
                "event": calEvent
            }).then(res => {
                if (!res.exists) {
                    console.log(calEvent.summary + " didn't exist, now exists in server, putting it on chain...");
                    BabCoinContract.methods
                        .createEvent(calEvent.iCalUID, 10)
                        .send({from: this.state.userEthAddress})
                        .then(() => {
                            // don't need to do anything
                            console.log("now on chain");
                        });
                }
            });
        }
    }

    render() {
        return (
            <div className={"home"}>
                <table>
                    <tbody>
                    <br/>
                    <tr>
                        <td>
                            <Profile name={this.state.email} coin={this.state.coin} totalCoin={this.state.totalCoin}
                                     userEthAddress={this.state.userEthAddress}/>
                        </td>

                    </tr>
                    <br/>
                    <tr>
                        <td>
                            <EventList events={this.state.events} userEmail={this.state.email}
                                       balance={this.state.coin} updateBalance={this.handleUpdateBalance}
                                       userEthAddress={this.state.userEthAddress}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;
