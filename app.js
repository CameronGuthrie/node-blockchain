'use strict'

// imports
import {Blockchain} from './blockchain.js';
import {Transaction} from './transaction.js';
import * as wallet from './wallet.js';

// if there are no blocks build a genesis block
if (!Blockchain.props.chain.length) Blockchain.methods.buildFirstBlock();

// // add some more blocks to the chain

// Blockchain.methods.buildNewBlock({name: "Penelope", age: 32, bool: false});

// Blockchain.methods.buildNewBlock({name: "Jeff", age: 21, bool: true});

// Blockchain.methods.buildNewBlock({name: "Old Person", age: 999, bool: false});

// create some wallets
const miningWallet = wallet.createWallet();

const walletOne = wallet.createWallet();
const walletTwo = wallet.createWallet();
const walletThree = wallet.createWallet();

// create some transactions
const tx1 = new Transaction(walletOne.publicKey, walletTwo.publicKey, 10);
tx1.signTransaction(walletOne);
Blockchain.methods.addToMempool(tx1);

// mine block with transactions
Blockchain.methods.buildNewBlock(miningWallet.publicKey);

// create MORE transactions
const tx2 = new Transaction(walletThree.publicKey, walletOne.publicKey, 5);
tx2.signTransaction(walletThree);
Blockchain.methods.addToMempool(tx2);

const tx3 = new Transaction(walletTwo.publicKey, walletThree.publicKey, 12);
tx3.signTransaction(walletTwo);
Blockchain.methods.addToMempool(tx3);

// mine block with transactions
Blockchain.methods.buildNewBlock(miningWallet.publicKey);