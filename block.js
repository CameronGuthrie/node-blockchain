'use strict'

// imports
const crypto = await import('crypto');

class Block {
    constructor (index, data, previousHash, n) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.n = n;
        this.hash = this.genHash();
    }
    genHash = () => crypto.createHash('sha256').update(
                        this.index + 
                        this.timestamp + 
                        JSON.stringify(this.data) + 
                        this.previousHash + 
                        this.n
                    ).digest('hex');
}

// exports
export {Block};