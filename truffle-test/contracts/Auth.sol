// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    uint256 public userCount;
    struct User {
        address userAddress;
        string signatureHash;
    }
    mapping(address=>User) private users;

    event accountCreated(address indexed _from, uint256 indexed _userCount);

    constructor(){
        userCount = 0;
    }

    //add user to users mapping
    function register(string memory signature) public{

        //prevents user from registering an account that is already registered
        require(
            users[msg.sender].userAddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );

        users[msg.sender].signatureHash = signature;
        users[msg.sender].userAddress = msg.sender;
        userCount++;

        emit accountCreated(msg.sender, userCount);


    }

    function getSignatureHash() public view returns(string memory){

        //require that only hashes of registered users can be returned
        require(
            msg.sender == users[msg.sender].userAddress,
            "not allowed"
        );
        return users[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns(address){
        return users[msg.sender].userAddress;
    }
}