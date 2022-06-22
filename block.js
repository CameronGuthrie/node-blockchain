'use strict'

// imports
const crypto = await import('crypto');

// the block class
class Block {
    constructor (index, data, previousHash, nOnce) {
        // the position of the block in the chain
        this.index = index;
        // when the block was created
        // TODO [H] Should grab this from a global, not sure how node calculates time,
        //  could screw up if someone has their local times set wrong
        //      [C] So calling a method to get the time now, 
        //          only fix for system time would be pinging a server for the time I think
        this.timestamp = this.getTime();
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
    // TODO [H] Mixing data types, here we have string, number, a date, is this a good idea?
    //          [C] All strings now... should prevent any issues (though I think it auto mutated everything but the custom object)
    genHash = () => crypto.createHash('sha256').update(
                        this.index.toString() + 
                        this.timestamp.toString() + 
                        JSON.stringify(this.data) + 
                        this.previousHash.toString() + 
                        this.nOnce.toString()
                    ).digest('hex');
    // method to return a date as number of miliseconds from epoch in UTC 
    getTime = () => new Date()[Symbol.toPrimitive]('number');
}

// exports
export {Block};