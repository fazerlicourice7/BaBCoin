import React, {Component} from 'react';
import EventCard from "../EventCard/EventCard";
import {map} from "react-bootstrap/cjs/utils/ElementChildren";


class EventsList extends Component {

    constructor(props) {
        super(props);
        console.log(props.events);
        this.events = this.populateEvents(props.events);
        console.log(this.events);
    }

    populateEvents(calEvents) {
        //return calEvents.map(this.createEventCard);
        return map(calEvents, this.createEventCard);
    }

    createEventCard(rawEventData) {
        console.log("title: {}, description: {}, loc: {}, datetime: {}".format(rawEventData.summary, rawEventData.description, rawEventData.location, rawEventData.start.datetime));
        return <li><EventCard title={rawEventData.summary} description={rawEventData.description}
                              location={rawEventData.location} datetime={rawEventData.start.dateTime}/></li>
    }

    render() {
        return (
            <div className={"eventsList"}>
                <ul>
                    {this.events}
                </ul>
            </div>
        );
    }
}

export default EventsList;