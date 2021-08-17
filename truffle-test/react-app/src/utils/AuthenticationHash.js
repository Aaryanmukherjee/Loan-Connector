import SignData from './SignData';

const AuthenticationHash = async (username, accountAddress, password, digiCode, web3) => {
    //fetch hashed signature based on username and address
    let signedMessage = await SignData(username, accountAddress, web3);

    //generate hashed message based on pw and code
    let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + digiCode);

    return await web3.eth.accounts.hashMessage(signedMessage + passwordDigiCodeHash);
}

export default AuthenticationHash;