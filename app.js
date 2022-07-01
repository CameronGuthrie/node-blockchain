'use strict'


/*
    START OF DUMMY DATA
*/

// imports
import {Blockchain} from './blockchain.js';
import {Transaction} from './transaction.js';
import * as wallet from './wallet.js';

// if there are no blocks build a genesis block
if (!Blockchain.props.chain.length) Blockchain.methods.buildFirstBlock();

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


/*
    END OF DUMMY DATA
*/

// imports
import {Controller} from './controller.js';
import express from 'express';

// spin up the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// grab endpoint behaviour from the controller
const controller = new Controller();

// get the whole chain
app.get('/blockchain', (req, res) => {
    res.json(controller.getChain()).end();
});

// get pending transactions
app.get('/mempool', (req, res) => {
    res.json(controller.getMempool()).end();
});

// get a specific block
app.get('/block/:id', (req, res) => {
    res.json(controller.getBlock(req.params.id)).end();
});

// get a specific transaction
app.get('/transaction/:id', (req, res) => {
    res.json(controller.getTransaction(req.params.id)).end();
});

// exports
export {app};