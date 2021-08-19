// import AuthABI from "./AuthABI.json";
import Auth from "./Auth.json"


const AuthContract = async (web3) => {

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Auth.networks[networkId];

    return new web3.eth.Contract(
        Auth.abi,
        "0x423B81A506C22f80Db0DFF4789a218fDC910F7e7"
    );
    

    // return new web3.eth.Contract(
    //     AuthABI,
    //     "0xd8d530C4ca8f511392B47c0C4dD62aAC516B6FE9" //get address of locally deployed contract
    // );
}

export default AuthContract;
