import USDXBasic from "./USDXBasic.json"
import USDXBasicABI from "./USDXBasicABI.json"


const USDXBasicContract = async (web3) => {



    return new web3.eth.Contract(
        USDXBasicABI,
        "0x07872EED1515d4df1D25fDF49f0Eb9D2B7Bd9757"
    );
    

    // return new web3.eth.Contract(
    //     AuthABI,
    //     "0xd8d530C4ca8f511392B47c0C4dD62aAC516B6FE9" //get address of locally deployed contract
    // );
}

export default USDXBasicContract;
