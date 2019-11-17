import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel, Form} from "react-bootstrap";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {

        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }

    componentDidMount() {
    }


    handleLogin(event) {
        event.preventDefault();
        console.log("logging in");
        window.gapi.auth2.getAuthInstance().signIn().then(() => {
            this.props.history.push({pathname: "/home", state: {email: this.state.email}});
        });
    }

    handleEmailInput(event) {
        event.preventDefault();
        this.setState({email: event.target.value});
        console.log(this.state.email);
    }

    render() {
        return (
            <div className="LoginForm">
                <Form>
                    <h3> Sign In </h3>
                    <FormGroup>
                        <FormLabel column={"Email Address"}/>
                        <FormControl type={"email"} className={"form=control"} placeholder={"Enter Email"}
                                     onChange={this.handleEmailInput}/>
                        <FormLabel column={"Password"}/>
                        <FormControl type={"password"} className={"form-control"} value={this.state.pass}
                                     placeholder={"Enter Password"}/>
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
