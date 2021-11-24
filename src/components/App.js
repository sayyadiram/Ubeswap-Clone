import React, { Component } from 'react'
import Web3 from "web3";
import{newKitFromWeb3} from "@celo/contractkit"
import CeloDollar from  "../abis/CeloDollar.json"
import UbeswapClone from "../abis/UbeswapClone.json"
import Navbar from './Navbar'
import './App.css'
import { consoleLogger } from '@celo/base';

let kit 

class App extends Component {

  

  async componentDidMount(){//works the same as useeffect
     await this.loadWeb3()
     await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 =new Web3(window.celo)
    kit=newKitFromWeb3(web3)
    //select account
    const accounts=await kit.web3.eth.getAccounts()
   // kit.defaultAccount=accounts[0]
    this.setState({account:accounts[0]})
    console.log("all our accounts...",kit.defaultAccount)
    const networkId= await web3.eth.net.getId()
    console.log("our networkid",networkId)
    // loading the smart contrat data
    const cusdTokenData = CeloDollar.networks[networkId]
    console.log("our contract data loaded",cusdTokenData)



  }
  //
  async loadWeb3(){
    if(window.celo){
      window.alert("approve Ubeswap to use celo web wallet")
      try{
        await window.celo.enable();
      }
      catch{
        window.alert("error")
      }
    }else{
      window.alert("Please insatall the celo wallet")
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0'
    }
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://app.ubeswap.org"
                  target="_blank"
                  rel="noopener noreferrer">
                </a>

                <h1>Hello, World!</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/*

import React,{Component} from "react"

class App extends Component{
  render(){
    return(
      <div>
        <h1> Hello cello</h1>
      </div>
    )
  }
}
export default  App;*/