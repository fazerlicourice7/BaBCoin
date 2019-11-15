import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel, Form} from "react-bootstrap";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleLogin = this.handleLogin.bind(this);

    }

    componentDidMount() {
        // const script = document.createElement("script");
        // script.src = "https://apis.google.com/js/api.js";
        // script.async = true;
        // document.body.appendChild(script);
        //
        // script.onload = () => this.initClient();

    }


    handleLogin(event) {
        event.preventDefault();
        console.log("logging in");
        window.gapi.auth2.getAuthInstance().signIn().then(() => {
            this.props.history.push("/home");
        });
    }


    render() {
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
                    <Button block type="submit" onClick={this.handleLogin} className="submitButton">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }


}

export default Login;
