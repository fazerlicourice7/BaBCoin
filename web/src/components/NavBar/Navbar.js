import logo from "../../logo.svg";
import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src={logo} width="30" height="30" />
                    </a>
                    <Link to="/" className="navbar-brand">B@B Coin Event App</Link>
                    <div className="collapse nv-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-Link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

}