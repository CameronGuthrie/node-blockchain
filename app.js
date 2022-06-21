'use strict'

// imports
import {Blockchain} from './blockchain.js';

// there are no blocks build a genesis block
if (!Blockchain.props.length) Blockchain.methods.buildFirstBlock();

// add some more blocks to the chain

Blockchain.methods.buildNewBlock({name: "Penelope", age: 32, bool: false});

Blockchain.methods.buildNewBlock({name: "Jeff", age: 21, bool: true});

Blockchain.methods.buildNewBlock({name: "Old Person", age: 999, bool: false});