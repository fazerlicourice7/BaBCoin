import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl, FormLabel, Form} from "react-bootstrap";
import "./Login.css";
import ApiCalendar from 'react-google-calendar-api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {email: '', setEmail: '', password: '', setPassword: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        var p1 = new Promise((resolve, reject) => {
            ApiCalendar.handleAuthClick();
            if (ApiCalendar.sign) {
                resolve('Success');
            } else {
                reject('not signed in');
            }
        });
        p1.then((message) => {
            if (message === 'Success') {
                alert('success');
                this.props.history.push("/home");
            } else {
                alert('resolved, but not success.');
            }
        }).catch((e) => {
            alert('error');
        });
        this.props.history.push("/home");
    }


    render() { //this.props.history.push({pathname:"/Home"})
        return (
            <div className="LoginForm">
                <Form>
                    <h3> Sign In </h3>
                    <FormGroup>
                        <FormLabel column={"Email Address"}/>
                        <FormControl type={"email"} className={"form=control"} placeholder={"Enter Email"}/>

                        <FormLabel column={"Password"}/>
                        <FormControl type={"password"} className={"form-control"} placeholder={"Enter Password"}/>
                    </FormGroup>
                    <Button block type="submit" onClick={this.handleSubmit} className="submitButton">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }


}

export default Login;
