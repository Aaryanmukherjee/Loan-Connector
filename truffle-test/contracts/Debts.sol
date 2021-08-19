// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Debts {
    
    struct debt {
        address borrowerAddress;
        uint256 collateralProvided;
        uint256 collateralFactor;
        uint256 amountOwed;
        uint256 interestRate;
    }

    mapping(address => debt) public debts; 

    uint256 borrowerCount;

    event debtCreated(address indexed _from, uint256 indexed _userCount);

    constructor() public{
        borrowerCount=0;
    }

    function initBorrower(uint256 collateralProvided_in, uint256 collateralFactor_in, uint256 amountOwed_in, uint256 interestRate_in) public{
        
        // require(collateralProvided_in*collateralFactor_in/100 >= amountOwed_in,"insufficient collateral provided");
        debts[msg.sender].borrowerAddress = msg.sender;
        debts[msg.sender].collateralProvided = collateralProvided_in;
        debts[msg.sender].collateralFactor = collateralFactor_in;
        debts[msg.sender].amountOwed = amountOwed_in;
        debts[msg.sender].interestRate = interestRate_in;

        borrowerCount++;

        emit debtCreated(msg.sender,borrowerCount);
    }

    function liquidateAssets() public returns(bool){
        
        if(debts[msg.sender].amountOwed > debts[msg.sender].collateralFactor * debts[msg.sender].collateralProvided/100){

            debts[msg.sender].amountOwed = 0;
            debts[msg.sender].collateralProvided = 0;
            return true;

        }else{

            return false;

        }
    }

    function incrementAmountOwed() public{
        debts[msg.sender].amountOwed = (debts[msg.sender].interestRate+100)*debts[msg.sender].amountOwed/100;
    }
    
    function getDebt() public view returns(uint256,uint256,uint256,uint256){
        return (debts[msg.sender].collateralProvided,debts[msg.sender].collateralFactor,debts[msg.sender].amountOwed,debts[msg.sender].interestRate);
    }

    function repay(uint256 repay_amount) public{
        require(repay_amount <= debts[msg.sender].amountOwed);
        debts[msg.sender].amountOwed = debts[msg.sender].amountOwed - repay_amount;
    }

    function testFunction() public view returns( string memory ){
        return ("Hello");
    }

    
}


