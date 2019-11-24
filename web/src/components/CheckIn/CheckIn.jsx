import React, {Component} from 'react';

class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
             iCalID: this.props.location.state.iCalID,
             selectValue: ''
        };
        axios.post("localhost:4000/eventrespondees", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.state.iCalID
        }).then(res => {
             // res.data.rsvp_map - take the keys;
             this.state.rsvped = res.data.rspv_map.keys();
        });
        // call eventrespondees to get list of ppl who can checkin, add to props
        this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
    }

    handleChange(e) {
         this.setState({selectValue: e}); //might be e.value
    }

   addPerson() {
        if (this.props.selectValue == '') {
             return;
        }
        axios.post("localhost:4000/checkin", {
            origin: "http://localhost:3000",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            iCalID: this.props.iCalID,
            email: this.props.selectValue
        }).then(res => {
            console.log("checked in!");
        });
   }

    render() {
        return (
            <div className={"CheckIn"}>
            // use options of dropdown to map people and

               <Input type="select" label="Select person to check in" onChange={this.handleChange}>
                    {this.state.rsvped.map((e, index) => {
                         return <option value={e}>{e}</option>;
                    })}
               </Input>
               <Button variant="success" onClick={this.addPerson}>Add</Button>

            </div>
        );
    }
}

export default CheckIn;
