import React, {Component} from 'react';
import EventCard from "../EventCard/EventCard";
import {map} from "react-bootstrap/cjs/utils/ElementChildren";


class EventsList extends Component {

    constructor(props) {

        super(props);
        console.log("events passed to events list: " + props.events);
        this.state = {
            //events: this.populateEvents(props.events)
        };
        console.log(this.state.events);
        //this.createEventCard = this.createEventCard.bind(this);
    }

    populateEvents(calEvents) {
        //return calEvents.map(this.createEventCard);
        var listEvents = [];
        for (var i = 0; i  < calEvents.length; i++){
            listEvents.concat(this.createEventCard(calEvents[i]));
        }
        return listEvents;
    }

    createEventCard(rawEventData) {
        console.log('creating event card');
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