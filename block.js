'use strict'

// imports
const crypto = await import('crypto');

// the block class
class Block {

    constructor (index, transactions, previousHash) {
        // the position of the block in the chain
        this.index = index;
        // when the block was created
        // this.timestamp = this.getTime();
        // array of transactions contained inside the block
        this.transactions = transactions;
        // the hash of the preceding block
        this.previousHash = previousHash;
        // a single use number for re-hashing the block
        this.nOnce = 0;
        // the hash of the block
        this.hash = this.genHash();
    }

    // how we generate a sha256 hash using the crypto library inside Node.js
    // we hash everything inside of the block other than the hash itself
    genHash = () => crypto.createHash('sha256').update(
                        this.index.toString() + 
                        // this.timestamp.toString() + 
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
    mineBlock = () => {
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

    // // validate the transactions 
    // validateTransactions = () => {
    //     // enhanced for loop over transaction array
    //     for (let item of this.transactions) {
    //         if (!item.)
    //     }
    //     // if everything is valid then
    //     return true
    // }

}

// exports
export {Block};