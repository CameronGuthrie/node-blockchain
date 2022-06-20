'use strict'

// imports
const crypto = await import('crypto');

class Block {
    constructor (index, data, previousHash, nOnce) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.nOnce = nOnce;
        this.hash = this.genHash();
    }
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