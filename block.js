'use strict'

// imports
const crypto = await import('crypto');

// the block class
class Block {
    constructor (index, data, previousHash, nOnce) {
        // the position of the block in the chain
        this.index = index;
        // when the block was created
        this.timestamp = Date.now();
        // the data contained inside the block
        this.data = data;
        // the hash of the preceding block
        this.previousHash = previousHash;
        // a single use number for re-hashing the block
        this.nOnce = nOnce;
        // the hash of the block
        this.hash = this.genHash();
    }
    // how we generate a sha256 hash using the crypto library inside Node.js
    // we hash everything inside of the block other than the hash itself
    genHash = () => crypto.createHash('sha256').update(
                        this.index + 
                        this.timestamp + 
                        JSON.stringify(this.data) + 
                        this.previousHash + 
                        this.nOnce
                    ).digest('hex');
}

// exports
export {Block};