import React, {Component} from 'react';
import EventCard from "../EventCard/EventCard";

class EventsList extends Component {


    constructor(props) {
        super(props);
        this.createEventCard = this.createEventCard.bind(this);
    }

    populateEvents(calEvents) {
        if (calEvents !== undefined) {
            var listEvents = calEvents.map((event) => {
                return this.createEventCard(event)
            });
            return listEvents.map((card, index) => {
                return <div style={{paddingTop: '10px'}} key={index}>{card}</div>
            });
        }
        return undefined;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("events in component update: " + this.props.events);
        this.render();
    }

    createEventCard(rawEventData) {
        return <EventCard title={rawEventData.summary} description={rawEventData.description}
                          location={rawEventData.location} datetime={rawEventData.start.dateTime}
                          userEmail={this.props.userEmail} balance={this.props.balance}
                          userEthAddress={this.props.userEthAddress} iCalID={rawEventData.iCalUID}
                            updateBalance={this.props.updateBalance}/>
    }

    render() {
        return (
            <div className={"eventsList"}>

                {this.populateEvents(this.props.events)}

            </div>
        );
    }
}

export default EventsList;
