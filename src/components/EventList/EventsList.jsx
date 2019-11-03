import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import EventCard from "../EventCard/EventCard";


class EventsList extends Component {
    render() {
        return (
            <div className={"eventsList"}>
                <EventCard title= 'Winter Retreat' description = 'Hawaiiiii'/>
                <EventCard title= 'Club Consensus' description= "fun"/>
            </div>
        );
    }
}

export default EventsList;