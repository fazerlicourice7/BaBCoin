import './Profile.css';
import React, {Component} from 'react';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.name,
            userEmail: this.props.email,
            coin: this.props.coin
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.userName}</h1>
                <h2>{this.state.userEmail}</h2>
                <p>Balance: {this.state.coin} BabCoin</p>
                <p>Total BabCoin Accrued: 500 BaBCoin</p>
            </div>
        );
    }
}

export default Profile;
