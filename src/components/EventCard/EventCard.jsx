import './EventCard.css';
import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';

export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description
        };
        console.log("event card");
    }

    render() {
        return (
            <div className={"eventCard"}>
                <Card>
                    <Card.Body>
                        <Card.Title>{this.state.title}</Card.Title>
                        <Card.Text>{this.state.description}</Card.Text>
                        <Button variant="primary">RSVP</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}