'use strict'

// imports
import {Blockchain} from './blockchain.js';
import {Block} from './block.js';

const addBlock = data => Blockchain.methods.setNewBlock(new Block(Blockchain.props.chain.length,Date.now(),data));

Blockchain.methods.setFirstBlock();

addBlock({name: "Jeff", age: 21, bool: true});

console.dir(Blockchain.props.chain);