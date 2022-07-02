'use strict'

/*
    START OF DUMMY DATA
*/

// imports
import {Blockchain} from './blockchain.js';
import {Transaction} from './transaction.js';
import * as wallet from './wallet.js';

// if there are no blocks build a genesis block
export const blockchain = new Blockchain();

// create some wallets
const miningWallet = wallet.createWallet();

const walletOne = wallet.createWallet();
const walletTwo = wallet.createWallet();
const walletThree = wallet.createWallet();

console.log(`private key: ${walletOne.privateKey}`);
console.log(`public key: ${walletOne.publicKey}`)

// give all wallets a balance of 200
blockchain.mempool = [new Transaction('reward', walletOne.publicKey, 200), new Transaction('reward', walletTwo.publicKey, 200), new Transaction('reward', walletThree.publicKey, 200)];

// mine block with transactions
blockchain.buildNewBlock(miningWallet.publicKey);

// create some transactions
const tx1 = new Transaction(walletOne.publicKey, walletTwo.publicKey, 10);
tx1.signTransaction(walletOne.publicKey, walletOne.privateKey);
blockchain.addToMempool(tx1);

// mine block with transactions
blockchain.buildNewBlock(miningWallet.publicKey);

// create MORE transactions
const tx2 = new Transaction(walletThree.publicKey, walletOne.publicKey, 5);
tx2.signTransaction(walletThree.publicKey, walletThree.privateKey);
blockchain.addToMempool(tx2);

const tx3 = new Transaction(walletTwo.publicKey, walletThree.publicKey, 12);
tx3.signTransaction(walletTwo.publicKey, walletTwo.privateKey);
blockchain.addToMempool(tx3);

// mine block with transactions
blockchain.buildNewBlock(miningWallet.publicKey);

// add another transaction to the mempool
const tx4 = new Transaction(walletOne.publicKey, walletThree.publicKey, 1);
tx4.signTransaction(walletOne.publicKey, walletOne.privateKey);
blockchain.addToMempool(tx4);


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

// get amount of coins in wallet
app.get('/balance/:walletAddress', (req, res) => {
    res.json(controller.getBalance(req.params.walletAddress)).end();
});

// post transaction
app.post('/transaction', (req, res) => {
    res.json(controller.postTransaction(req.body.fromAddress, req.body.toAddress, req.body.amount, req.body.publicKey, req.body.privateKey)).end();
});

// exports
export {app};