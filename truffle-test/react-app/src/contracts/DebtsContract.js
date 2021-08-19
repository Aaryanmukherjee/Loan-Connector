import Debts from "./Debts.json"
import DebtsABI from "./DebtsABI.json"


const DebtsContract = async (web3) => {

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Debts.networks[networkId];

    return new web3.eth.Contract(
        DebtsABI,
        "0x4594158c07346A1a68FA0047Fe81dcC7435142A8"
    );
    

    // return new web3.eth.Contract(
    //     AuthABI,
    //     "0xd8d530C4ca8f511392B47c0C4dD62aAC516B6FE9" //get address of locally deployed contract
    // );
}

export default DebtsContract;
