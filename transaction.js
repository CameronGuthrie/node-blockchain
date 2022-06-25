'use strict'

// imports
const {
    crypto,
    createECDH,
    ECDH
  } = await import('crypto');
const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

class Transaction {
    constructor (fromAddress, toAddress, ammount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.ammount = ammount;
        // this.timestamp = this.getTime();
        //this.hash = this.genHash();
    }

    // method to hash the transaction
    genHash = () => crypto.createHash('sha256').update(
        this.fromAddress.toString() + 
        this.toAddress.toString() + 
        this.ammount.toString()
    ).digest('hex');

    // method to return a date as number of miliseconds from epoch in UTC 
    getTime = () => new Date()[Symbol.toPrimitive]('number');

    // key shenanigans
    signTransaction(signingKey) {
        
        // check transaction is valid
        if (this.fromAddress === null) return true;

        // check the sender public key is the one used
        if (signingKey.getPublic('hex') !== this.fromAddress) throw new Error('Cannot sign from wallet address provided');

        // set up the hash of the transaction
        this.hash = this.genHash();

        // sign with the key, passing in the hash, encoding with base 64
        const sign = signingKey.sign(this.hash, 'base64');

        // Convert the signature to DER format (binary using Derencoding)
        this.signature - sign.toDer('hex');
    }
}

// exports
export {Transaction};