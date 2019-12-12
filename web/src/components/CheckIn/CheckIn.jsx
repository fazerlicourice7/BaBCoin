import React, {Component} from 'react';

import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Input,
    Form
} from 'react-bootstrap';
import './CheckIn.css';

const axios = require('axios');

class CheckIn extends Component {

    constructor(props) {
        super(props);
        console.log("icalid in checkin: " + this.props.iCalID);
        this.state = {

            iCalID: this.props.iCalID,
            selectValue: '',
            rsvped: []
        };
        axios.post("http://localhost:4000/eventrespondees", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.props.iCalID
        }).then(res => {
            // res.data.rsvp_map - take the keys;
            this.populateRespondees(res.data.rsvp_map);
        });
        // call eventrespondees to get list of ppl who can checkin, add to props
        this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);

    }

    populateRespondees(rsvpMap) {
        axios.post("http://localhost:4000/eventrespondees", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.props.iCalID
        }).then(res => {
            var keys = Object.keys(res.data.rsvp_map);
            var positive_respondees = keys.map((key, index) => {
                if (res.data.rsvp_map[key] === 1 || res.data.rsvp_map[key] === 2) {
                    return key;
                }
            });
            axios.post("http://localhost:4000/getattendees", {
                origin: "http://localhost:3000",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'no-cors',
                iCalID: this.props.iCalID
            }).then(result => {
                console.log(result);
                var attendees = result.data.users_attended.map((user, index) => {
                    return user.email;
                });
                console.log("processed list of attendees: " + attendees);
                var respondeesToBeCheckedIn = positive_respondees.map((email, index) => {
                    if (!attendees.includes(email)) {
                        return email;
                    }
                });
                this.setState({"rsvped": respondeesToBeCheckedIn});
            })
        });
    }

    handleChange(e) {

        this.setState({selectValue: e.target.value}); //might be e.value
    }

    addPerson() {
        console.log(this.state.selectValue);
        if (this.state.selectValue === '') {
            return;
        }
        axios.post("http://localhost:4000/checkin", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.state.iCalID,
            email: this.state.selectValue
        }).then(result => {
            console.log("checked in!");
            this.populateRespondees();
        });
    }

    render() {
        return (
            <div className={"CheckIn"}>

                <Form>
                    <Form.Group>
                        <Form.Label column={"person"}>Select a person to Check in</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                            {this.state.rsvped.map((e, index) => {
                                //if(this.state.rsvped[e] ===1 || this.state.rsvped[e] ===2) {
                                return <option value={e}>{e}</option>;
                                //}
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="success" onClick={this.addPerson}>Add</Button>
                </Form>


            </div>
        );
    }
}

export default CheckIn;
