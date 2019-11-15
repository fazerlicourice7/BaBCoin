import './Profile.css';
import React, {Component} from 'react';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.name,
            coin: this.props.coin
        };
    }

    render() {
        return (
            <div>
                <h1>{this.userName}</h1>
                <p>Balance: {this.coin} BabCoin</p>
                <p>Total BabCoin Accrued: 500 BaBCoin</p>
            </div>
        );
    }
}

export default Profile;
