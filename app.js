'use strict'

// imports
import {Blockchain} from './blockchain.js';

Blockchain.methods.setFirstBlock();

Blockchain.methods.setNewBlock({name: "Penelope", age: 32, bool: false});

Blockchain.methods.setNewBlock({name: "Jeff", age: 21, bool: true});
