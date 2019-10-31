import './EventCard.css';
import {React, Component} from 'react';

class EventCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description
        };
    }
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>{this.state.description}</Card.Text>
                    <Button variant="primary">RSVP</Button>
                </Card.Body>
            </Card>
        );
    }
}