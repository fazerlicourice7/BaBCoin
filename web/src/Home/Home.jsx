import './Home.css';
import React, {Component} from 'react';
import Profile from '../components/Profile/Profile'
import EventList from '../components/EventList/EventsList'
import {calendarID} from "../apiGoogleconfig.json";

const axios = require('axios');
const request = require('request');

class Home extends Component {


    constructor(props) {
        super(props);
        //alert('test');
        this.getEvents();
        this.state = {
            email: this.props.location.state.email,
            coin: this.getCoinFromServer(this.props.location.state.email)
        };
    }

    getCoinFromServer(userEmail) {
        var userName = userEmail.split("@")[0];
        console.log(userName);
        axios.post("http://localhost:4000/user", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            body: JSON.stringify({name: userName, email: userEmail})
        }).then(res => {
            console.log("returned from server/user: " + JSON.stringify(res));
            this.setState({
                coin: res.data.balance,
                total_accrued: res.data.total_accrued
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

    getEvents() {
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
                for (var i = 0; i < events.length; i++) {
                    console.log("event in getEvents, home: " + events[i]);
                }
                this.setState({events: events});
            } else {
                return ['No upcoming events found.'];
            }
        });
    }

    componentDidMount() {
        this.render();
    }

    render() {
        return (
            <div className={"home"}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Profile name={this.state.email} coin={this.state.coin}/>
                        </td>
                        <td>
                            <EventList events={this.state.events}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;
