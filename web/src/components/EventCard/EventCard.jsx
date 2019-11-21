import './EventCard.css';
import React, {Component} from 'react';
import {Card, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

const axios = require('axios');

export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            location: props.location,
            datetime: props.datetime,
            iCalID: props.iCalID
        };
        console.log("event card");

        this.onRSVP = this.onRSVP.bind(this);
    }

    onRSVP(e) {
        var isGoing;
        if (e == 1) {
             isGoing = true;
        } else if (e == 2) {
             isGoing = false;
        } else {
             return;
        }
        axios.post("localhost:4000/rsvp", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            email: this.props.userEmail,
            iCalID: this.props.iCalID,
            going: isGoing,
            amount: 10
        }).then(res => {
            var newBalance = res.balance;
            console.log("new balance: " + newBalance);
        });
    }
//<!-- <Button variant="primary" onClick={this.onRSVP}>RSVP</Button> -->
    render() {
        return (
            <div className={"eventCard"}>
                <Card>
                    <Card.Body>
                         <Card.Title>{this.state.title}</Card.Title>
                         <Card.Body> <Card.Text>{this.state.description}</Card.Text>
                         <Card.Text>{this.state.location}</Card.Text>
                         <Card.Text>{this.state.datetime}</Card.Text></Card.Body>


                        <ButtonToolbar>
                        <ToggleButtonGroup id={this.state.iCalID} type="radio" name="options" defaultValue={3} onChange={this.onRSVP}>
                          <ToggleButton variant="outline-success" value={1}>Going</ToggleButton>
                          <ToggleButton variant="outline-warning" value={2}>Maybe</ToggleButton>
                          <ToggleButton variant="outline-danger" value={3}>No</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
