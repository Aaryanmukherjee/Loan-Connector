import logo from './logo.svg';
import './App.css';
import {UserAuth} from "./components/UserAuth"
import {WelcomePage} from "./components/WelcomePage"
import {Dashboard} from "./components/Dashboard"
import 'semantic-ui-css/semantic.min.css'
import {Step, Grid, Menu, Header, Icon, Button, Container} from "semantic-ui-react"
import React, {useState, useEffect} from 'react';

import web3Connection from './getWeb3';
import AuthContract from './contracts/AuthContract';
import USDXBasicContract from './contracts/USDXBasicContract';
import DebtsContract from './contracts/DebtsContract';




function App() {

  const [activeMenuItem, setActiveMenuItem] = useState("Sign Up");
  const [authenticated, setAuthenticated] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [_web3, _setWeb3] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [uniqueName, setUniqueName] = useState("");

  const [_authContract, _setAuthContract] = useState(null);
  const [_USDXBasicContract, _setUSDXBasicContract] = useState(null);
  const [_debtsContract, _setDebtsContract] = useState(null);

  //look into creating states for other contracts

  useEffect(async ()=>{
      try {
        const web3 = await web3Connection();
        const authContract = await AuthContract(web3);
        const usdxBasicContract = await USDXBasicContract(web3);
        const debtsContract = await DebtsContract(web3);
        const accounts = await web3.eth.getAccounts();
      
        _setWeb3(web3);
        _setAuthContract(authContract);
        _setUSDXBasicContract(usdxBasicContract);
        _setDebtsContract(debtsContract);

        setAccount(accounts[0]);
        await web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            setBalance(web3.utils.fromWei(balance, 'ether'));
          }
        });

        if (web3 !== null || web3 !== undefined) {
          await window.ethereum.on('accountsChanged', async (acc) => {

            setAccount(acc[0]);
            setLoggedIn(false);

            await web3.eth.getBalance(acc[0], (err, balance) => {
              if (!err) {
                setBalance(web3.utils.fromWei(balance, 'ether'));
              }
            });
          });
        }
          

        console.log("web3 =", web3);
        console.log("Contract =", authContract);
        console.log("Account =", accounts);
        
    
      } catch (error) {
        alert(
          `Failed to load web3`,
        );
        console.error(error);
      }
    
    
    
  });

  

  const handleMenuItemClick = (e,{name}) =>{
    if(name === "Log Out"){
      setLoggedIn(false);
      setUniqueName("");
    }else{
      setActiveMenuItem(name);

    }

    
    
    
    
  } 

  
  return (
    <div className="App">
      <Menu size='large'>
        <Menu.Item
          name='Loan Connector'
          className="menu-logo"
          
          
        >
          <Icon name ="ethereum" />
          Loan Connector
        </Menu.Item>

        


          {loggedIn === false ? 

            <Menu.Menu position="right">  
              <Menu.Item
                name='Sign In'
                active={activeMenuItem==='Sign In'}
                onClick= {handleMenuItemClick}
                position="right"
              >
                Sign In
              </Menu.Item>
              <Menu.Item>
                <Button 
                  primary
                  onClick= {handleMenuItemClick}
                  name="Sign Up"
                >
                  Sign Up
                </Button>
              </Menu.Item>


            </Menu.Menu>
          
          : 
          <Menu.Menu position="right">  
            
            <Menu.Item>
              <Button 
                primary
                onClick= {handleMenuItemClick}
                name="Log Out"
              >
                Log Out
              </Button>
            </Menu.Item>


          </Menu.Menu>
      
          
          }
          


       
        
        

        
      </Menu>

      {loggedIn===false ?

        <Grid columns={2} verticalAlign='middle'  divided className="landing">
        <Grid.Column width= {9} className="menu-welcome">

          
          <WelcomePage />


        </Grid.Column>
        <Grid.Column  width={6}>

            <UserAuth USDXBasicContract ={_USDXBasicContract}setUniqueName = {setUniqueName} type = {activeMenuItem} account = {account} authContract = {_authContract} web3={_web3} setLoggedIn = {setLoggedIn}/>
            
          
        </Grid.Column>

        </Grid>
        :
        <Dashboard account = {account} uniqueName = {uniqueName} balance ={balance}  USDXBasicContract = {_USDXBasicContract} debtsContract = {_debtsContract}/>
              
    
    
      }

      


      
    </div>
  );
}

export default App;
