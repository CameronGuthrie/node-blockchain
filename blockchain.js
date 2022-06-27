'use strict'

// imports
import {Block} from './block.js'
import {Transaction} from './transaction.js';

// the blockchain object
const Blockchain = {

    props: {
        chain: [], 
        mempool: [],
        reward : 2
    },

    methods: {

        // this is to build genesis block object and add it in the chain
        buildFirstBlock: () => Blockchain.methods.addBlock(new Block(0, `Genesis Block`, ``)),

        // this method will return the latest block in the chain
        getBlock: (index) => Blockchain.props.chain.at(index),

        // this is an object builder for new blocks
        buildNewBlock: (minerAddress) => {
            const block = new Block(Blockchain.props.chain.length, Blockchain.props.mempool, Blockchain.methods.getBlock(-1).hash);
            // call the mineBlock method to go through the process of getting a hash
            const newBlock = block.mine(block);
            // validate the chain then the block
            if (!Blockchain.methods.validateChain()) throw new Error('invalid chain');
            if (!Blockchain.methods.validateBlock(newBlock)) throw new Error(`invalid block :\n${newBlock}`); 
            Blockchain.methods.addBlock(newBlock);
            // add the reward for mining to the mempool
            Blockchain.props.mempool = [new Transaction(null, minerAddress, Blockchain.props.reward)]
        },

        // pushes new blocks to the chain and outputs them to console
        addBlock (newBlock) {
            // set the timestamp for the block
            newBlock.timestamp = newBlock.getTime();
            // add the block the the end of the chain
            Blockchain.props.chain.push(newBlock);
            // output the block to console
            console.dir(newBlock);
        },

        // validate the new block
        validateBlock: (newBlock) => {
            // get the previous block
            const latestBlock = Blockchain.methods.getBlock(-1);
            // check the hash of the new block is correct
            if (newBlock.hash !== newBlock.genHash()) return false;
            // check the hash of the previous block is stored in the new block
            if (latestBlock.hash !== newBlock.previousHash) return false;
            return true;
        },

        // validate the whole chain
        validateChain: () => {
            // check if the blockchain has more than one block
            if (Blockchain.props.chain.length) {
                // loop through the chain
                for (let i = 1; i < Blockchain.props.chain.length; i++) {
                    // get the block at position i
                    const currentBlock = Blockchain.props.chain[i];
                    // get the preceding block
                    const previousBlock = Blockchain.props.chain[i - 1];
                    // then that the hash of the block at i is correct
                    if (currentBlock.hash !== currentBlock.genHash()) return false;
                    // check that the hash of the block at i-1 is stored in the block at i
                    if (currentBlock.previousHash !== previousBlock.hash) return false;
                }
                return true;
            }
            return true;
        },

        // add a transaction to the mempool
        addToMempool(transaction) {

            // if there is no form address or to address throw an error
            if (!transaction.fromAddress || !transaction.toAddress) throw new Error('Transaction must include both a from and to address');

            // if the transaction is not valid throw an error
            if (!transaction.isValid()) throw new Error('Cannot add invalid transaction to chain');

            // add transaction to the mempool
            this.mempool.push(transaction);
        },

        // set balance on all addresses
        getAddressBalance(address) {
            // set balance to zero
            let balance = 0;
            // loop through every block in the chain
            for (const block of Blockchain.props.chain) {
                // loop through every transaction in the block
                for(const transaction of block.transactions) {
                    // if the address is sending then reduce the balance by the sent ammount
                    if (transaction.fromAddress === address) balance -= transaction.ammount;
                    // if the address is recieving then increase the balance by the sent ammount
                    if (transaction.toAddress === address) balance += transaction.ammount;
                }
            }
            // return the balance
            return balance;
        }

    }

}

// exports
export {Blockchain};