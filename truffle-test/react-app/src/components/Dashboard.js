import React, {useState,useEffect} from 'react'; 
import {Form, Segment, Header, Divider, Input, Button, Container, Message, Grid} from 'semantic-ui-react'

export const Dashboard = (props) =>{
    

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
            
        </div>
    )
}