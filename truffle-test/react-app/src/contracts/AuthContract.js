import AuthABI from "./AuthABI.json";

const AuthContract = async (web3) => {
    

    return new web3.eth.Contract(
        AuthABI,
        "0xd8d530C4ca8f511392B47c0C4dD62aAC516B6FE9" //get address of locally deployed contract
    );
}

export default AuthContract;
