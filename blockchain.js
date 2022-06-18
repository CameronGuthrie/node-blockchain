'use strict'

// imports
import {Block} from './block.js'

// block
class Blockchain {

    // class constructor
    constructor() {
        this.chain = [
            this.setFirstBlock()
        ];
    }

    // getter for length of chain
    getChainLength = () => this.chain.length

    // setter for first block
    setFirstBlock = () => new Block(0, Date.now(), `We are number one!`, ``);

    // getter for latest block
    getLatestBlock = () => this.chain[this.getChainLength() - 1];

    // setter for new block
    setNewBlock = (newBlock) => {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.genHash();
        this.chain.push(newBlock);
    }

    // validate chain integrity
    checkChain = () => {

        // loop through every block in the chain
        for(const [i, block] of this.blockchain.entries()) {

            // select a block
            const currentBlock = block;
            // and the previous block
            const previousBlock = this.blockchain[i - 1];

            // if the hash of the block doesn't match the computed hash
            // then chain integrity is bad
            if (currentBlock.hash !== currentBlock.genHash()) return false;

            // if the hash of the previous block in current block doesn't match the hash of the previous block in the previous block
            // then chain integrity is bad
            if (currentBlock.previousHash !== previousBlock.hash) return false;

            // otherwise chain integrity is good
            return true;
        }
    }
    
}

// exports
export {Blockchain};