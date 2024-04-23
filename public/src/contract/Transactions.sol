//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract Transactions {
    function deposit() external payable {}

    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getAddress() external view returns (address) {
        return address(this);
    }
}
