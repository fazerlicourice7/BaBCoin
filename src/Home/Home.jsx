import './Home.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Profile from '../components/Profile/Profile'
import EventList from '../components/EventList/EventsList'
import ApiCalendar from 'react-google-calendar-api';


class Home extends Component {

    //move to a constants file.
    CAL_ID = 'jt8mpvuljj288e0pu5s55ocus0@group.calendar.google.com';

    constructor(props) {
        super(props);
        //alert('test');
        this.events = this.getEvents();
        console.log(this.events);
    }

    getEvents() {
        //return ApiCalendar.listUpcomingEvents(10, this.CAL_ID);
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
                            <Profile/>
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

/*
<div className={"home"}>
                <table>
                    <tr>
                        <td>
                            <Profile/>
                        </td>
                        <td>
                            <EventList/>
                        </td>
                    </tr>
                </table>
            </div>
 */
export default Home;
