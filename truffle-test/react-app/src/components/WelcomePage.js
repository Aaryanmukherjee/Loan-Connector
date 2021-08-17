import React, {useState} from 'react'; 
import {Step, Grid, Menu, Header, Icon, Button, Container} from "semantic-ui-react"


export const WelcomePage = (props) =>{



    return (
        <Container textAlign='left'>

            <h2>A Secure <br/> Blockhain Alternative to <br/> UMich Student Loans</h2>
            <h4>Lend or Borrow Through DeFi Today</h4>

            <h3>Steps</h3>

            <Step.Group vertical ordered>
              <Step>
                <Icon color = "blue" name="credit card"></Icon>
                <Step.Content>
                  <Step.Title>Wallet</Step.Title>
                  <Step.Description>Connect your MetaMask Wallet</Step.Description>
                </Step.Content>
              </Step>
              <Step>
                <Icon color ="blue" name="user"></Icon>
                <Step.Content>
                  <Step.Title>Log In</Step.Title>
                  <Step.Description>Log in with your UMich Email</Step.Description>
                </Step.Content>
              </Step>
              <Step>
                <Icon color ="blue" name="check square outline"></Icon>
                <Step.Content>
                  <Step.Title>You're Set!</Step.Title>
                  {/* <Step.Description>Access UMich Loan Tokens</Step.Description> */}
                </Step.Content>
              </Step>
            </Step.Group>


          </Container>

    );
} 