'use strict'

// imports
import {Blockchain} from './blockchain.js';
import {Block} from './block.js';

Blockchain.methods.setFirstBlock();

Blockchain.methods.setNewBlock(
    new Block(1, Date.now(), {
        key: "value",
        age: 99,
        string: "this is a string"
    })
);

console.dir(Blockchain.props.chain);