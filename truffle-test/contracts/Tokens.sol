// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract USDXBasic {

    string public constant name = "USDXBasic";
    string public constant symbol = "USDX";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_;

    using SafeMath for uint256;


    constructor() public { 
        totalSupply_ = 100000;
        balances[address(0xc914eA491BAC13d131444c773F81D5BD585D1D24)] = totalSupply_;
    }

    function totalSupply() public view  returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view  returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public  returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public  returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view  returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public  returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
    function mint(address account, uint256 amount) public{
        require(account != address(0x0000000000000000000000000000000000000000), "Can not send to black hole address" );
        balances[account] = balances[account].add(amount);
        totalSupply_ = totalSupply_.add(amount);
        emit Transfer(address(0x0000000000000000000000000000000000000000),account,amount);
    }
}



contract MICHBasic {

    string public constant name = "MICHBasic";
    string public constant symbol = "MICH";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_;

    using SafeMath for uint256;


   constructor() public { 
        totalSupply_ = 100000;
        balances[address(0xc4c124b5441b333039180F7a09DF5b022710d19C)] = totalSupply_;
    }

    function totalSupply() public  view  returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view  returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public  returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public  returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public  view  returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public  returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
    function mint(address account, uint256 amount) public{
        require(account != address(0x0000000000000000000000000000000000000000), "Can not send to black hole address" );
        balances[account] = balances[account].add(amount);
        totalSupply_ = totalSupply_.add(amount);
        emit Transfer(address(0x0000000000000000000000000000000000000000),account,amount);
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}