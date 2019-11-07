import './Home.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Profile from '../components/Profile/Profile'
import EventList from '../components/EventList/EventsList'
class Home extends Component {
    constructor(props) {
        super(props);
        //alert('test');
        console.log("constructor");
    }

    componentDidMount() {
        console.log("didmount");
    }

    render() {
        console.log("render");
        return (
            <div className={"home"}>
]                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Profile/>
                        </td>
                        <td>
                            <EventList/>
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
