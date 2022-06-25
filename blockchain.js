'use strict'

// imports
import {Block} from './block.js'

// the blockchain object
const Blockchain = {

    props: {
        chain: [],
        pendingTransactions: []
    },

    methods: {

        // this is to build genesis block object and add it in the chain
        buildFirstBlock: () => Blockchain.methods.addBlock(new Block(0, `Genesis Block`, ``)),

        // this method will return the latest block in the chain
        getBlock: (index) => Blockchain.props.chain.at(index),

        // this is an object builder for new blocks
        buildNewBlock: (transactions) => {
            const block = new Block(Blockchain.props.chain.length, transactions, Blockchain.methods.getBlock(-1).hash);
            // call the mineBlock method to go through the process of getting a hash
            const newBlock = block.mineBlock(block);
            // validate the chain then the block
            if (!Blockchain.methods.validateChain()) throw new Error('invalid chain');
            if (!Blockchain.methods.validateBlock(newBlock)) throw new Error(`invalid block :\n${newBlock}`); 
            Blockchain.methods.addBlock(newBlock);
        },

        // pushes new blocks to the chain and outputs them to console
        addBlock (newBlock) {
            newBlock.timestamp = newBlock.getTime();
            Blockchain.props.chain.push(newBlock);
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
            if (Blockchain.props.chain.length) { // <- truthy/falsey principles so don't need >= 1
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
        }

    }

}

// exports
export {Blockchain};