import React, { Component } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import './App.css'

class App extends Component {

  // Calling the function of web3
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // Defining load block chain data
  async loadBlockChainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
  }

  
  // Using this async function to connect the app to the block chain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0fff'
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
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
