import React, {useState,useEffect} from 'react'; 
import {Form, Statistic, Segment, Card, Divider, Input, Button, Container, Message, Grid, Icon} from 'semantic-ui-react'

export const Dashboard = (props) =>{


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       alert("hi");
    //       console.log(interval)
    //     }, 5000);
    //     return () => clearInterval(interval);
    //   }, []);

    const {USDXBasicContract, debtsContract} = props;

    const [showDebts, setShowDebts] = useState(false);

    const [debt, setDebt] = useState({0:0,1:0,2:0,3:0});
    const [balance, setBalance] = useState(0);
    const [allowed, setAllowed] = useState(0);
    const [USDXPoolAddress,setUSDXPoolAddress] = useState('0xc914eA491BAC13d131444c773F81D5BD585D1D24')

    const [borrowAmount, setBorrowAmount] = useState("");
    const [lendAmount, setLendAmount] = useState("");
    const [repayAmount, setRepayAmount] = useState("");

    const [collateralFactor, setCollateralFactor] = useState(75);
    const [borrowRate, setBorrowRate] = useState(7);
    const [lendRate, setLendRate] = useState(5);

    const [counterOn, setCounterOn] = useState(false);
    const [counter, setCounter] = useState(10);

    const refreshCards = async () =>{
        const debtObj = await debtsContract.methods.getDebt().call({from:props.account},(error,result)=>{
            console.log(error);
        })
        setDebt(debtObj);


        const balance_ = await USDXBasicContract.methods.balanceOf(props.account).call({from:props.account},(error,result)=>{
            console.log(result)
        }); 
        const allowed_ = await USDXBasicContract.methods.allowance(USDXPoolAddress,props.account).call({from:props.account},(error,result)=>{
            console.log(result)
        });
        setBalance(balance_);
        setAllowed(allowed_);
    }
    useEffect(async () =>{
        refreshCards();
    },[])

    const borrowOnSubmitHandler = async () =>{

        // await debtsContract.methods.initBorrower( Math.floor((borrowAmount*100/collateralFactor)) , collateralFactor, borrowAmount, borrowRate).send({from: props.account});

        // const test = await debtsContract.methods.testFunction().call({from: props.account});
        // console.log(test);
        await debtsContract.methods.initBorrower( Math.floor(100/collateralFactor * parseInt(borrowAmount)), collateralFactor, parseInt(borrowAmount), borrowRate).send({from: props.account},(error,result)=>{
            console.log(error);
        });
        const debtObj = await debtsContract.methods.getDebt().call({from:props.account},(error,result)=>{
            console.log(error);
        })
        setDebt(debtObj);
        

        await USDXBasicContract.methods.approveFromPool(props.account, borrowAmount).send({from: props.account},(error,result)=>{
            console.log(error,result)
        });
        const balance_ = await USDXBasicContract.methods.balanceOf(props.account).call({from:props.account},(error,result)=>{
            console.log(result)
        }); 
        const allowed_ = await USDXBasicContract.methods.allowance(USDXPoolAddress,props.account).call({from:props.account},(error,result)=>{
            console.log(result)
        });
        setBalance(balance_);
        setAllowed(allowed_);

        setCounterOn(true);
        if(counter===0){
            setCounter(10);
        }else{
            setCounter(counter - 1);
        }
        
        

    }

    const repayOnSubmitHandler = async () =>{
        await debtsContract.methods.repay(repayAmount).send({from:props.account});
        const debtObj = await debtsContract.methods.getDebt().call({from:props.account},(error,result)=>{
            console.log(error);
        })
        setDebt(debtObj);
        setRepayAmount("");
    }

    
    useEffect(async () => {
        counter > 0 && setTimeout(() => {
            if(counterOn){
                setCounter(counter - 1);
            }
            
        }, 1000);
        if(counter===0){
            
            await debtsContract.methods.incrementAmountOwed().send({from:props.account});
            let liquidated = await debtsContract.methods.liquidateAssets().send({from:props.account}).then(function(result){
                console.log(result)
            });
            if(liquidated){
                await USDXBasicContract.methods.approveFromPool(props.account, 0).send({from:props.account});
                
                refreshCards();
            }else{
                
                refreshCards();
            }
            

        }
    }, [counter]);
    

    


    

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


            <h2>Marketplace</h2>
            <Segment className ="token-view">
                <Grid columns={4} verticalAlign="middle" >
                    <Grid.Column className="token-symbol" width = {2} >
                        <Icon name="dollar sign" Fitted></Icon> 
                        USDX
                    </Grid.Column>
                    <Grid.Column  className="token-apys" width = {6}>

                        <Segment compact color="grey">
                            Borrow APY: {borrowRate}%
                        </Segment>
                        <Segment compact color="grey">
                            Deposit APY: {lendRate}%
                        </Segment>
                        <Segment compact color="red">
                            Collateral Factor: 75%
                        </Segment>

                    </Grid.Column>
                    <Grid.Column className="token-loan" >
                        <Form onSubmit={borrowOnSubmitHandler}>
                            <Form.Field 

                                control={Input}
                                placeholder='Borrow Amount'
                                value = {borrowAmount}
                                onChange = {e=>setBorrowAmount(e.target.value)}

                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content= "Borrow"
                                primary = {true}
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column className="token-loan" >
                        <Form>
                            <Form.Field 
                                control={Input}
                                placeholder='Lend Amount'
                                value = {lendAmount}
                                onChange = {e=>setLendAmount(e.target.value)}
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
            <Grid columns={2} verticalAlign="middle" divided className="debt-timer-view">
                <Grid.Column width={8}>

                    <Segment className="finances">
                        
                             
                            <Card className ="debt-info"centered={false}>
                                
                                <Card.Content>
                                    <Card.Header>USDX Loan</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{debt[3]}% APY</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Amount Owed: {debt[2]}
                                    </Card.Description>
                                    <Card.Description>
                                        Collateral Provided: {debt[0]}
                                    </Card.Description>
                                    
                                </Card.Content>
                                
                            </Card>
                            <Card className ="debt-info"centered={false}>
                                
                                <Card.Content>
                                    <Card.Header>USDX Wallet</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Loan Connector</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Balance: {balance}
                                    </Card.Description>
                                    <Card.Description>
                                        Allowed: {allowed}
                                    </Card.Description>
                                    
                                </Card.Content>
                                
                            </Card>
                            
                        
                        
                            
                    </Segment>

                </Grid.Column>

                <Grid.Column width={8}>
                    <h2>Time until interest accrues</h2>
                    <Statistic size ="huge" horizontal>
                        <Statistic.Value>{counter}</Statistic.Value>
                        <Statistic.Label>Seconds</Statistic.Label>
                    </Statistic>
                    <Form onSubmit={repayOnSubmitHandler}>

                            <Form.Field 
                                control={Input}
                                placeholder='Repay Amount'
                                value = {repayAmount}
                                onChange = {e=>setRepayAmount(e.target.value)}
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content= "Repay"
                                primary = {true}
                                
                            />

                    </Form>
                    <Button className = "refresh-button"content= "Refresh" onClick={refreshCards}>

                    </Button>
                </Grid.Column>
            </Grid>

            
            
        </div>
    )
}