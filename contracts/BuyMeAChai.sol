// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Import this file to use console.log
import "hardhat/console.sol";

contract BuyMeAChai {
    // Event to emit when a Memo is created
    event NewMemo(address indexed from, uint256 timestamp, string name, string message);

    // Memo Struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from friends
    Memo[] memos;

    /**
     * Address of the contract deployer
     * We need this because later we will withdraw eth to this address
     */
    address payable owner;

    /**
     * Deploy Logic
     * Runs only once when the contract is being deployed
     */
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Buy a Chai for the contract owner.
     * @param _name Name of the Chai buyer.
     * @param _message A nice message from the Chai buyer.
     */
    function buyChai(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy a Chai with 0 eth.");

        // Add the memo to the storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        // Emit a log event when a new Memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev Transfer balance stored in this contract to the owner.
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
     * @dev Retrive all the Memos received and stored in the blockchain.
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
