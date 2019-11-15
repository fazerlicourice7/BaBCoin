import React, {Component} from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./Home/Home";
import Navbar from "./components/NavBar/Navbar"

import './App.css';
import {apiKey, calendarID, clientId, discoveryDocs, scope} from "./apiGoogleconfig";

class App extends Component {

    constructor(props) {
        super(props);
        this.initClient = this.initClient.bind(this);
        this.handleClientLoad = this.handleClientLoad.bind(this);
        this.handleClientLoad();
    }

    initClient() {
        console.log("initializing client");
        window.gapi.client.init({
            apiKey: apiKey,
            clientId: clientId,
            scope: scope,
            discoveryDocs: discoveryDocs
        }).then(function () {
            console.log(window.gapi);
            window.gapi.load(discoveryDocs);
        });
    }

    handleClientLoad() {
        window.gapi.load('client:auth2', this.initClient);
    }

    render() {
        return (
            <Router>
                <div align="center" className="container">
                    <Navbar/>
                    <Route exact path={"/"} component={Login}/>
                    <Route exact path="/home" component={Home}/>
                </div>
            </Router>

        );
    }
}

//<Route exact path={"/home"} component={Home} />
function LandingPage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
