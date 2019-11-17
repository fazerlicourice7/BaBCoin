import './EventCard.css';
import React, {Component} from 'react';
import {Card, Button, ButtonGroup} from 'react-bootstrap';
const axios = require('axios');

export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            location: props.location,
            datetime: props.datetime
        };
        console.log("event card");

        this.onRSVP = this.onRSVP.bind(this);
    }

    onRSVP(){
        axios.post("localhost:4000/rsvp", { body: { email: 'vamshi.balanaga@berkeley.edu', stakeAmount: 10}})
    }

    render() {
        return (
            <div className={"eventCard"}>
                <Card>
                    <Card.Body>
                        <Card.Title>{this.state.title}</Card.Title>
                        <Card.Body> <Card.Text>{this.state.description}</Card.Text>
                            <Card.Text>{this.state.location}</Card.Text>
                        <Card.Text>{this.state.datetime}</Card.Text></Card.Body>

                        <Button variant="primary" onclick={this.onRSVP}>RSVP</Button>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
