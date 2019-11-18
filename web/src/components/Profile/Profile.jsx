import './Profile.css';
import React, {Component} from 'react';

class Profile extends Component {

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h2>{this.props.email}</h2>
                <p>Balance: {this.props.coin} BabCoin</p>
                <p>Total BabCoin Accrued: {this.props.totalCoin} BaBCoin</p>
            </div>
        );
    }
}

export default Profile;
