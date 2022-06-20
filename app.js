'use strict'

// imports
import {Blockchain} from './blockchain.js';

const addBlock = data => Blockchain.methods.setNewBlock(data);

Blockchain.methods.setFirstBlock();

addBlock({name: "Jeff", age: 21, bool: true});
addBlock({name: "Jane", age: 32, bool: false});

console.dir(Blockchain.props.chain);

// console.dir(Blockchain.methods.checkChain());