import './Profile.css';
import {React, Component} from 'react';

class Profile extends Component {
     render() {
          return (
               <div>
                    <h1>Timmy Turner</h1>
                    <p>Balance: 200 BabCoin</p>
                    <p>Total BabCoin Accrued: 500 BaBCoin</p>
               </div>
          );
     }
}

export default Profile;
