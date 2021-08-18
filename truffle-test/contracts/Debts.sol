// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Debts {
    
    struct debt {
        address borrowerAddress;
        uint256 collateralProvided;
        uint256 amountOwed;
        uint256 interestRate;
    }

    mapping(address => debt) private debts; 

    uint256 borrowerCount;

    constructor(){
        borrowerCount=0;
    }

    function initBorrower(uint256 collateralProvided_in, uint256 amountOwed_in, uint256 interestRate_in) public{
        require(debts[msg.sender].borrowerAddress == address(0x0000000000000000000000000000000000000000),"already borrowing");
        debts[msg.sender].borrowerAddress = msg.sender;
        debts[msg.sender].collateralProvided = collateralProvided_in;
        debts[msg.sender].amountOwed = amountOwed_in;
        debts[msg.sender].interestRate = interestRate_in;

        borrowerCount++;


    }

    function liquidateAssets(uint256 collateralFactor) public returns(bool){
        require(collateralFactor >0 && collateralFactor <= 1, "Collateral factor is invalid");
        if(debts[msg.sender].amountOwed > collateralFactor * debts[msg.sender].collateralProvided){

            debts[msg.sender].amountOwed = 0;
            debts[msg.sender].collateralProvided = 0;
            return true;

        }else{

            return false;

        }
    }

    function incrementAmountOwed() public{
        debts[msg.sender].amountOwed *= (1+debts[msg.sender].interestRate);
    }
}


