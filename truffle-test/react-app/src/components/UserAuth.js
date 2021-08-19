import React, {useState,useEffect} from 'react'; 
import {Form, Header, Divider, Input, Button, Container, Message} from 'semantic-ui-react'
import AuthenticationHash from "../utils/AuthenticationHash"
import AuthValidation from '../utils/AuthValidation';


export const UserAuth = (props) =>{
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [digicode, setDigicode] = useState("");
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorHeader, setErrorHeader] = useState("");

    useEffect(()=>{

        setEmail("");
        setPassword("");
        setDigicode("");
        setErrorState(false);

    },[props.type])
    

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(email!=='', password!== '', digicode!==""){
            let _email = email.trim();
            let _password = password.trim();
            let _digicode = digicode.trim();

            
            if( !_email.includes("@") || _email.split("@").length ==1 || _email.split("@")[1].toLowerCase() !== "umich.edu"){
                setErrorState(true);
                setErrorHeader("Invalid Credentials");
                setErrorMessage('You can only sign up using a Umich email address.');
                return;
            }
            if(_password.length < 8){
                setErrorState(true);
                setErrorHeader("Invalid Password");
                setErrorMessage('Password must be at least 8 characters'); 
                return;
            }
            if(_digicode.length < 6){
                setErrorState(true);
                setErrorHeader("Invalid Digicode");
                setErrorMessage('Digicode must be at least 6 digits'); 
                return;
            }
            if(props.type === "Sign In"){
                let validated = await AuthValidation(email,props.account, password, digicode, props.web3,props.authContract);
                console.log(validated);
                if(!validated){
                    setErrorState(true);
                    setErrorMessage("The entered credentials are incorrect");
                    setErrorHeader("Invalid Credentials")
                    
                }else{
                    let uniqueName = await  props.authContract.methods.getUniqueName().call({ from: props.account });

                    setEmail("");
                    setPassword("");
                    setDigicode("");

                    props.setLoggedIn(true);
                    props.setUniqueName(uniqueName);
                    
                    
                    
                }
            }else{
                let userAddress = await props.authContract.methods.getUserAddress()
                    .call({ from: props.account });
                console.log(userAddress);

                if (userAddress !== '0x0000000000000000000000000000000000000000') {
                    setErrorState(true);
                    setErrorMessage("This account already exists");
                    setErrorHeader("Registration error")
                    

                    return;
                } else {
                    let hash = await AuthenticationHash(email,props.account, password, digicode, props.web3);
                    let uniqueName = _email.split("@")[0].toLowerCase();

                    await props.USDXBasicContract.methods.mint(props.account,100000).send({ from: props.account });;
                    await props.authContract.methods.register(hash,uniqueName).send({ from: props.account });

                    setEmail("");
                    setPassword("");
                    setDigicode("");

                    props.setLoggedIn(true);
                    props.setUniqueName(uniqueName);

                    

                    // props.accountCreated(this.state.signedUp);
                    return;
                }

            }

        }

        


        console.log(email, password);

    }

    return(
        <div>
            <Form error = {errorState} className="signup-form" size="large" onSubmit = {handleSubmit}> 
                <Header as="h2">
                    <Header.Content>{props.type}</Header.Content>
                </Header>
                <Message
                    error
                    header={errorHeader}
                    content= {errorMessage}
                />

                <Form.Field 
                    id='form-input-control-first-name'
                    control={Input}
                    label='UMich Email'
                    placeholder='UMich Email'
                    value = {email}
                    onChange = {e=>setEmail(e.target.value)}
                    
                />
                <Form.Field 
                    id='form-input-control-password'
                    control={Input}
                    label='Password'
                    placeholder='Password'
                    value = {password}
                    type='password' 
                    onChange = {e=>setPassword(e.target.value)}
                />
                <Form.Field 
                    id='form-input-control-password'
                    control={Input}
                    label='Digicode'
                    placeholder='Digicode'
                    value = {digicode}
                    type='number' 
                    onChange = {e=>setDigicode(e.target.value)}
                    
                />
                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content= {props.type === "Sign Up" ? "Create Account" : "Sign In"}
                    primary = {props.type === "Sign Up" ? true : false }
                      
                />

               
                
            </Form> 
        </div>
    );
}