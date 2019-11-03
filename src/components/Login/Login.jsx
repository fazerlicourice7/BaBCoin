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
