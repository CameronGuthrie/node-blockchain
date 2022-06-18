'use strict'

// imports
import {Blockchain, functionalBlockchain} from './blockchain.js';
import {
    Block,
    functionalBlock as functionalBlockchainExample,
    functionalBlock as functionalBlockExample,
    functionalBlock
} from './block.js';

let accountChain = new Blockchain();
console.log("Creating account chain...");

accountChain.setNewBlock(
    new Block(1, Date.now(), {
        key: "value",
        age: 99,
        string: "this is a string"
    })
);

console.log(JSON.stringify(accountChain, null, 5));

// functional app
const functionalApp = functionalBlockchain

functionalBlockExample.props = {
    index: functionalApp.props.index.push(1),
    timestamp: functionalApp.props.timestamp.push(Date.now()),
    data: functionalApp.props.data.push("this is some data"),
    previousHash: functionalApp.props.previousHash.push(""),
    hash: functionalApp.props.hash.push(functionalBlockchainExample.methods.genHash()),
}

functionalApp.props.chain.push(functionalBlock)