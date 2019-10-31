import './Home.css';
import {React, Component} from 'react';
import Profile from './Profile'
import EventList from './EventList'

class Home extends Component {
     render() {
          return (
               <div className="Home">
                    <table >
                         <tr>
                              <td>
                              <Profile></Profile>
                              </td>
                              <td>
                              <EventList></EventList>
                              </td>
                         </tr>
                    </table>
               </div>
          );
     }
}

export default Home;
