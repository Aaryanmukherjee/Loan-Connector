import React, {useState,useEffect} from 'react'; 
import {Form, Segment, Header, Divider, Input, Button, Container, Message, Grid, Icon} from 'semantic-ui-react'

export const Dashboard = (props) =>{


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       alert("hi");
    //       console.log(interval)
    //     }, 5000);
    //     return () => clearInterval(interval);
    //   }, []);
    

    return(
        <div>
            <Segment  className="dashboard" >
                <Grid className="dashboard-grid"  columns={2} verticalAlign="middle" >
                    
                        <Grid.Column className="dashboard-welcome" floated = {"right"}>
                            <h2>
                                Welcome <br/> Back <span>{props.uniqueName}</span>
                            </h2>
                            
                            
                        </Grid.Column>  
                        <Grid.Column className ="dashboard-info" floated = {"right"} >
                        
                            
                            <Segment.Group compact>
                                <Segment className="header">
                                  Account Information                                      
                                </Segment>
                                <Segment>
                                  Address: {props.account}                                      
                                </Segment>
                                <Segment>
                                  Balance: {props.balance}                                      
                                </Segment>

                            </Segment.Group>
                       
                        
                    </Grid.Column>
                    
                    
                    
                    

                </Grid>

            </Segment>

            <Segment className ="token-view">
                <Grid columns={4} verticalAlign="middle">
                    <Grid.Column className="token-symbol" width={2}>
                        <Icon name="dollar sign" Fitted></Icon> 
                        USDX
                    </Grid.Column>
                    <Grid.Column  className="token-apys" width={6}>

                        <Segment compact color="grey">
                            Borrow APY: 7%
                        </Segment>
                        <Segment compact color="grey">
                            Deposit APY: 5%
                        </Segment>

                    </Grid.Column>
                    <Grid.Column className="token-loan" width={4}>
                        <Form>
                            <Form.Field 
                                
                                control={Input}
                                
                                placeholder='Borrow Amount'
                                
                                
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content= "Borrow"
                                primary = {true}
                                
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column className="token-loan" width={4}>
                        <Form>
                            <Form.Field 
                                
                                control={Input}
                                
                                placeholder='Lend Amount'
                                
                                
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content= "Lend"
                                primary = {true}
                                
                            />
                        </Form>
                    </Grid.Column>

                </Grid>
            </Segment>
            
        </div>
    )
}