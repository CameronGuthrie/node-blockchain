'use strict'

/*
    Blockchain can only CR and not UD
*/

// imports
// import {Blockchain} from './blockchain.js';
import {blockchain} from './app.js';
import {Transaction} from './transaction.js';

// controller for managing endpoint behaviour
class Controller {

    // return all of the blocks in the chain
    getChain = () => {
        return blockchain.chain;
    }

    // return the mempool (all pending transactions)
    getMempool = () => {
        return blockchain.mempool;
    }

    // return block by hash
    getBlock = (hash) => {
        for (const block of blockchain.chain){
            if (block.hash === hash) return block;
        }
        return `Block with index ${index} not found`;
    }

    // return all transactions in a block
    getTransactions = (index) => {
        return blockchain.getBlock(index).transactions;
    }

    // return transaction by id (hash)
    getTransaction = (txid) => {
        for (const block of blockchain.chain){
            for (const transaction of block.transactions) {
                if (transaction.txid === txid) return transaction;
            }
        }
        return `Transaction with id ${txid} not found`;
    }
    
    // return amount of coins in wallet
    getBalance = (walletAddress) => {
        return blockchain.getAddressBalance(walletAddress) || 0;
    }

    // send a transaction
    postTransaction = (fromAddress, toAddress, amount, publicKey, privateKey) => {
        const tx = new Transaction(fromAddress, toAddress, amount);
        tx.signTransaction(publicKey, privateKey);
        blockchain.addToMempool(tx);
        return tx;
    }
}

// exports
export {Controller};