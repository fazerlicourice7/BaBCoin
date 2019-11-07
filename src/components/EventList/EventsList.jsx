import React, {Component} from 'react';
import {map} from 'react-bootstrap';
import EventCard from "../EventCard/EventCard";


class EventsList extends Component {

    constructor(props){
        super(props);
        console.log(props.events);
        this.events = this.populateEvents(props.events);
        console.log(this.events);
    }

    populateEvents(calEvents){
        return calEvents.map(this.createEventCard);
    }

    createEventCard(rawEventData){
        return <li><EventCard title={rawEventData.title} description={rawEventData.description} /></li>
    }

    render() {
        return (
            <div className={"eventsList"}>
                <ul>
                this.events
                </ul>
            </div>
        );
    }
}

export default EventsList;