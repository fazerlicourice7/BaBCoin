import './EventCard.css';
import React, {Component} from 'react';
import {
    Card,
    Button,
    ButtonGroup,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import Web3 from "web3";
import * as constants from "../../constants";
import {forEach} from "react-bootstrap/cjs/utils/ElementChildren";

const axios = require('axios');

const AMOUNT = 10;
const web3 = new Web3(window.ethereum);

window.ethereum.enable().catch(error => {
    // User denied account access
    console.log(error)
});

const BabCoinContract = new web3.eth.Contract(
    constants.BABCoinABI,
    constants.contractAddress
);


export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExec: props.isExec,
            title: props.title,
            description: props.description,
            location: props.location,
            datetime: props.datetime,
            iCalID: props.iCalID
        };

        console.log("event card");

        this.onRSVP = this.onRSVP.bind(this);
        this.endEvent = this.endEvent.bind(this);
        this.scanIn = this.scanIn.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:4000/rsvpstatus", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            email: this.props.userEmail,
            iCalID: this.props.iCalID
        }).then(res => {
            var currentStatus = res.data.status;
            
        });
    }

    onRSVP(e) {
        axios.get("http://localhost:4000/rsvpstatus", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            email: this.props.userEmail,
            iCalID: this.props.iCalID
        }).then(res => {
            var currentStatus = res.data.status;
            var amountToCharge = 0;
            if (e !== currentStatus) {
                switch (e) {
                    case 1:
                        if (currentStatus === 2) {
                            amountToCharge = AMOUNT / 2;
                        } else {
                            amountToCharge = AMOUNT;
                        }
                        break;
                    case 2:
                        if (currentStatus === 1) {
                            amountToCharge = -1 * (AMOUNT / 2);
                        } else {
                            amountToCharge = AMOUNT / 2;
                        }
                        break;
                    case 3:
                        if (currentStatus === 1) {
                            amountToCharge = -AMOUNT;
                        } else {
                            amountToCharge = -(AMOUNT / 2);
                        }
                        break;
                    default:
                        break;
                }
                BabCoinContract.methods
                    .rsvp(this.props.iCalID, amountToCharge)
                    .send({from: this.props.userEthAddress})
                    .then(() => {
                        axios.post("http://localhost:4000/rsvp", {
                            origin: "http://localhost:3000",
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            },
                            mode: 'no-cors',
                            email: this.props.userEmail,
                            iCalID: this.props.iCalID,
                            going: e,
                            amount: amountToCharge
                        }).then(res => {
                            var newBalance = res.data.user.balance;
                            this.props.updateBalance(newBalance);
                        });
                    });
            }
        });


    }

    scanIn() {
        axios.post("localhost:4000/checkin", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            email: this.props.userEmail,
            ical: this.props.iCalID
        }).then(res => {

        });
    }

    payoutEachPerson(rsvpStatus, email, map) {
        var memberEthAddress;
        axios.post("http://localhost:4000/user", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            "name": "*",
            "email": email
        }).then(res => {
            memberEthAddress = res.data.ethAddress;
            BabCoinContract.methods
                .eventPayout(this.props.iCalID, memberEthAddress, AMOUNT)
                .send({from: this.props.userEthAddress})
                .then((res) => {
                    axios.post("http://localhost:4000/setuserbalance", {
                        origin: "http://localhost:3000",
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        mode: 'no-cors',
                        "newBalance": res,
                        "email": email
                    });
                });
        });
    }

    endEvent() {
        axios.post("localhost:4000/eventrespondees", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.props.iCalID
        }).then(res => {
            res.prototype.forEach(this.payoutEachPerson);
        });
    }

    render() {
        if (!this.state.isExec) {
            return (
                <div className={"eventCard"}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.state.title}</Card.Title>
                            <Card.Body> <Card.Text>{this.state.description}</Card.Text>
                                <Card.Text>{this.state.location}</Card.Text>
                                <Card.Text>{this.state.datetime}</Card.Text></Card.Body>


                            <ButtonToolbar>
                                <ToggleButtonGroup id={this.state.iCalID} type="radio" name="options" defaultValue={3}
                                                   onChange={this.onRSVP}>
                                    <ToggleButton variant="outline-success" value={1}>Going</ToggleButton>
                                    <ToggleButton variant="outline-warning" value={2}>Maybe</ToggleButton>
                                    <ToggleButton variant="outline-danger" value={3}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </div>
            );
        } else {
            return (
                <div className={"eventCard"}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.state.title}</Card.Title>
                            <Card.Body> <Card.Text>{this.state.description}</Card.Text>
                                <Card.Text>{this.state.location}</Card.Text>
                                <Card.Text>{this.state.datetime}</Card.Text></Card.Body>


                            <ButtonToolbar>
                                <ToggleButtonGroup id={this.state.iCalID} type="radio" name="options" defaultValue={3}
                                                   onChange={this.onRSVP}>
                                    <ToggleButton variant="outline-success" value={1}>Going</ToggleButton>
                                    <ToggleButton variant="outline-warning" value={2}>Maybe</ToggleButton>
                                    <ToggleButton variant="outline-danger" value={3}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </Card.Body>
                        <Card.Footer>
                            <Container>
                                <Row>
                                    <Col xs><Button variant="info" onClick={this.scanIn}>Scan</Button></Col>
                                    <Col xs></Col>
                                    <Col xs><Button variant="info" onClick={this.endEvent}>End Event</Button></Col>
                                </Row>
                            </Container>
                        </Card.Footer>
                    </Card>
                </div>
            );
        }

    }
}
