import React, { Component } from "react";
import Web3 from "web3";
import * as constants from "../../constants";
import Button from "react-bootstrap/Button";

const web3 = new Web3(window.ethereum);

window.ethereum.enable().catch(error => {
    // User denied account access
    console.log(error)
});

const BabCoinContract = new web3.eth.Contract(
  constants.BABCoinABI,
  constants.contractAddress
);

class web3Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: "",
      supply: 0,
      balance: 0
    };
  }

  componentDidMount() {
    web3.eth
      .getAccounts()
      .then(addr => {
        this.setState({ userAddress: addr[0] });
      })
      .then(() => {
        console.log("useraddress", this.state.userAddress);
      });
    BabCoinContract.methods
      .totalSupply()
      .call()
      .then(totalSupply => {
        console.log(totalSupply);
        this.setState({ supply: totalSupply });
      });
  }

  balance = () => {
    BabCoinContract.methods
      .balanceOf(this.state.userAddress)
      .call({ from: this.state.userAddress })
      .then(balanceOf => {
        console.log(balanceOf);
        this.setState({ balance: balanceOf });
      });
    // BabCoinContract.methods
    //   .transfer("0x627d307f597251E982E4C6ce43bbc8289a7A0d6C", 10)
    //   .send({ from: this.state.userAddress })
    //   .then(balanceOf => {
    //     console.log(balanceOf);
    //     this.setState({ balance: balanceOf });

  };

  render() {
    return (
      <div>
        <h1>
          The total supply is {this.state.supply} and the user address is
          {this.state.userAddress} and the user balance is {this.state.balance}
        </h1>
        <Button onClick={this.balance}>Transaction</Button>
      </div>
    );
  }
}

export default web3Testing;
