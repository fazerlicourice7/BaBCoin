import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./login.css";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {email: '', setEmail: '', password: '', setPassword: ''};
    }

    render() { //this.props.history.push({pathname:"/Home"})
        return (
            <div className="Login">
                <form onSubmit={this.props.history.push({
                    pathname: '/UserDashboard',
                    state: {temp: "lol"}})}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={e => this.setState( {email:e})}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={e => this.setState( {password:e})}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large"  type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
// disabled={!validateForm()}

export default Login;