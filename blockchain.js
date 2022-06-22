'use strict'

// imports
import {Block} from './block.js'

// the blockchain object
const Blockchain = {
    props: {
        chain: []
    },
    methods: {
        // this is to build genesis block object and add it in the chain
        // TODO [H] why is the first block empty? Maybe the first chain
        buildFirstBlock: () => Blockchain.methods.addBlock(new Block(0, `Genesis Block`, ``, 0)),

        // this method will return the latest block in the chain
        // TODO [H] why specifically the first method, I would suggest just a generic method to get a set block in your chain
        //          [C] Good idea, going to try this funky new at() method
        getBlock: (index) => Blockchain.props.chain.at(index),

        // this is an object builder for new blocks
        buildNewBlock: (data) => {
            const block = new Block(Blockchain.props.chain.length, data, Blockchain.methods.getBlock(-1).hash, 0);
            // call the mineBlock method to go through the process of getting a hash
            const newBlock = Blockchain.methods.mineBlock(block);
            // validate the chain then the block
            Blockchain.methods.validateChain() ? 
                (   Blockchain.methods.validateBlock(newBlock) ? 
                    Blockchain.methods.addBlock(newBlock) : 
                    console.error(`invalid block : ${newBlock}`)  ) :
                console.error('invalid chain');
        },

        // pushes new blocks to the chain and outputs them to console
        addBlock (newBlock) {
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
            if (Blockchain.props.chain.length >= 1) {
                // loop through the chain
                /* TODO [H] this for loop only ever loops once, it always returns something on the first iteration
                   if it doesn't hit a return on either if statement it will always return true */
                   //       [C] You're right, the return true should be outside the for loop, fixes
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

        // the criteria a block's hash has to meet for the block to be added to the chain
        proofOfWork: (hash) => { // make this complicated later
            // for example: the hash must start with...
            const constraint = '0000';
            return constraint === hash.slice(0,constraint.length);
        }, 

        // iterate the single use number stored in each block
        nextN: block => {
            // iterate n Once
            block.nOnce++;
            // generate a new hash
            block.hash = block.genHash();
            // return the block
            return block;
        },

        // mine a block - generate hashes until the proof of work is met
        mineBlock: (block) => {
            // mine a block
            function mine(block) {
                // iterate the n Once of the block and generate a new hash
                const newBlock = Blockchain.methods.nextN(block);
                // if the new hash satisfies the proof of work return the block
                // else mine a new hash for the block
                return Blockchain.methods.proofOfWork(newBlock.hash) ? newBlock : () => mine(newBlock);
            }
            // use the trampoline function to handle the recustion and return a mined block
            return Blockchain.methods.trampoline(mine(block));
        },

        // using trampoline to get around maximum call stack size exceeded
        // should eventually replace this with tail call in mineBlock function if support gets added again
        trampoline: fn => {
            let res = fn;
            while(typeof res === 'function') {
                res = res();
            }
            return res;
        }
    }
}

// exports
export {Blockchain};