import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl, FormLabel, Form} from "react-bootstrap";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {email: '', setEmail: '', password: '', setPassword: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit (event) {
        event.preventDefault();
        this.props.history.push("/home");
    }


    render() { //this.props.history.push({pathname:"/Home"})
        return (
            <Form>
                <h3> Sign In </h3>
                <FormGroup>
                    <FormLabel column={"Email Address"}/>
                    <input type={"email"} className={"form=control"} placeholder={"Enter Email"}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel column={"Password"}/>
                    <FormControl type={"password"} className={"form-control"} placeholder={"Enter Password"}/>
                </FormGroup>
                <FormGroup>
                    <input type={"checkbox"} className={"custom-control-input"} id={"rememberMeCheck"}/>
                    <label className={"custom-control-label"} htmlFor={"rememberMeCheck"}>Remember Me</label>
                </FormGroup>
                <Button block type="submit" onClick={this.handleSubmit}>
                    Login
                </Button>
            </Form>
        );
    }


}

export default Login;
