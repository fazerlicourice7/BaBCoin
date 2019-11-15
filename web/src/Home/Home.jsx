import './Home.css';
import React, {Component} from 'react';
import Profile from '../components/Profile/Profile'
import EventList from '../components/EventList/EventsList'
import {calendarID} from "../apiGoogleconfig.json";


class Home extends Component {


    constructor(props) {
        super(props);
        //alert('test');
        this.state = {
            events: this.getEvents(),
            user: this.getUserDetails()
        };
        console.log(this.events);
    }

    getUserDetails() {
        return {
            name: 'heya',
            coin: 2000
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
                    console.log(events[i]);
                }
                return events;
            } else {
                return ['No upcoming events found.'];
            }
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={"home"}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Profile name={this.state.user.name} coin={this.state.user.coin}/>
                        </td>
                        <td>
                            <EventList events={this.events}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;
