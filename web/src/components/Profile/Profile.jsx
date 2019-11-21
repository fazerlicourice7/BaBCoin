import './Profile.css';
import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';

class Profile extends Component {

    render() {
        return (
             <Card border="info" bg="light">
              <Card.Header><h1>{this.props.name}</h1></Card.Header>
              <Card.Body>
                <Card.Title>Balance: {this.props.coin} BabCoin</Card.Title>
                <Card.Text>
                  {this.props.email}
                </Card.Text>
                <Card.Text>
                  Total BabCoin Accrued: {this.props.totalCoin} BaBCoin
                </Card.Text>
              </Card.Body>
            </Card>
        );
    }
}

export default Profile;
