'use strict'

// imports
const crypto = await import('crypto');

class Block {
    constructor (index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.genHash();
    }
    genHash = () => crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).digest('hex');
}

// exports
export {Block};