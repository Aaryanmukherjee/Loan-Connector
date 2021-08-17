const SignData = async (username, accountAddress, web3) => {
    let signedData;

    //generate unique signature based on account username and address
    await web3.eth.personal.sign(
        username,
        accountAddress,
        (err, signature) => {
            if (err) {
                signedData = err;
            } else {
                //generate hash based on unique account signature
                signedData = web3.eth.accounts.hashMessage(signature);
            }
        }
    );

    return signedData;
}

export default SignData;