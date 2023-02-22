// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Board {
    event Message(address _address, string _message);
    function write(string memory _message) public {
        emit Message(msg.sender, _message);
    }
}