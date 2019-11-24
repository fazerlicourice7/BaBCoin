import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Input,
    Form
} from 'react-bootstrap';
import './CheckIn.css';

const axios = require('axios');

class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iCalID: this.props.iCalID,
            selectValue: ''
        };
        // axios.get("localhost:4000/eventrespondees", {
        //     origin: "http://localhost:3000",
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     mode: 'no-cors',
        //     iCalID: this.state.iCalID
        // }).then(res => {
            // res.data.rsvp_map - take the keys;
       this.state.rsvped = ['robbo@gmail.com', 'nishu@berk.edu', 'vamboy@stanford.edu'];//res.data.rspv_map.keys();
        // });
        // call eventrespondees to get list of ppl who can checkin, add to props
        this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);

    }

    handleChange(e) {
        this.setState({selectValue: e.target.value}); //might be e.value
    }

    addPerson() {
        console.log(this.state.selectValue);
        if (this.state.selectValue == '') {
            return;
        }
        axios.post("localhost:4000/checkin", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.state.iCalID,
            email: this.state.selectValue
        }).then(res => {
            console.log("checked in!");
        });
    }

    render() {
        return (
            <div className={"CheckIn"}>
            <Form>
               <Form.Group>
               <Form.Label>Select a person to Check in</Form.Label>
               <Form.Control as="select" onChange={this.handleChange}>
                    {this.state.rsvped.map((e, index) => {
                        return <option value={e}>{e}</option>;
                   })}
               </Form.Control>
               </Form.Group>
               <Button variant="success" onClick={this.addPerson}>Add</Button>
            </Form>




            </div>
        );
    }
}

export default CheckIn;
