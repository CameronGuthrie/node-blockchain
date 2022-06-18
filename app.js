'use strict'

// imports
import {Blockchain} from './blockchain.js';
import {Block} from './block.js';

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