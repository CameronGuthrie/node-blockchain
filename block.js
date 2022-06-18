'use strict'

// imports
const crypto = await import('crypto');

// block
class Block {

    // class constructor
    constructor (index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.genHash();
    }

    // generate hash for block
    genHash = () => {
        const hash = crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash);
        return hash.digest('hex');
    }
    
}

// const hash = crypto.createHash('sha256').update('this is a test string').digest('hex');
// console.log(hash);

// exports


const functionalBlock = {
    props: {
        index: [],
        timestamp: [],
        data: [],
        previousHash: [],
        hash: [],
    },
    methods: {
        genHash: () => {
            const hash = crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash);
            return hash.digest('hex');
        }
    }
}
export {Block, functionalBlock};