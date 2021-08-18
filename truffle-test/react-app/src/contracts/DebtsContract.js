import Debts from "./Debts.json"


const DebtsContract = async (web3) => {

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Debts.networks[networkId];

    return new web3.eth.Contract(
        Debts.abi,
        deployedNetwork.address
    );
    

    // return new web3.eth.Contract(
    //     AuthABI,
    //     "0xd8d530C4ca8f511392B47c0C4dD62aAC516B6FE9" //get address of locally deployed contract
    // );
}

export default DebtsContract;