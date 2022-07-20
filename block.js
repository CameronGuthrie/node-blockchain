'use strict'

// imports
import crypto from 'crypto';

// the block class
class Block {

    constructor (index, transactions, previousHash) { 
        this.index = Number(index); // the position of the block in the chain (sometimes called height)
        this.transactions = transactions ;// array of transactions contained inside the block
        this.previousHash = String(previousHash); // the hash of the preceding block
        this.nOnce = Number(0); // a single use number for re-hashing the block
        this.hash = String(this.genHash()); // the hash of the block
    }

    // generate a sha256 hash using the crypto library inside Node.js
    genHash = () => crypto.createHash('sha256').update(
        this.index.toString() + 
        JSON.stringify(this.transactions) + 
        this.previousHash.toString() + 
        this.nOnce.toString()
    ).digest('hex');

    // method to return a date as number of miliseconds from epoch in UTC 
    getTime = () => new Date()[Symbol.toPrimitive]('number');

    // the criteria a block's hash has to meet for the block to be added to the chain
    proofOfWork = (hash) => { // make this complicated later
        // for example: the hash must start with...
        const constraint = '0000';
        return constraint === hash.slice(0,constraint.length);
    }

    // simple function to generate hashes until proof of work is satisfied
    mine = () => {
        // while proof of work is not satisfied
        while (!this.proofOfWork(this.hash)) {
            // iterate the n Once
            this.nOnce++;
            // generate a new hash
            this.hash = this.genHash();
        }
        // return the block
        return this;
    }

    // validate the transactions 
    validateAllTransactions = () => {
        // enhanced for loop over transaction array
        for (const transaction of this.transactions) {
            // if the transaction is not valid return false
            if (!transaction.validateTransaction()) return false;
        }
        // if everything is valid then
        return true
    }

}

// exports
export {Block};