'use strict'

// imports
const crypto = await import('crypto');

class Transaction {
    constructor (fromAddress, toAddress, ammount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.ammount = ammount;
    }

    // method to hash the transaction from node.js crypto lib
    genHash = () => crypto.createHash('sha256').update(
        this.fromAddress.toString() + 
        this.toAddress.toString() + 
        this.ammount.toString()
    ).digest('hex');

    // method to return a date as number of miliseconds from epoch in UTC 
    getTime = () => new Date()[Symbol.toPrimitive]('number');

    // sign the transaction
    signTransaction(wallet) {
        // check the sender public key is the one used
        // right now this just checks the public key matches the 'fromAddress'
        if (wallet.publicKey !== this.fromAddress) throw new Error('Cannot sign from wallet address provided');

        // set the time of transaction
        this.timestamp = this.getTime();

        //sign the transaction (need to create a private key object)
        this.signature =    crypto.sign(
                                'sha256', // algorithm
                                this.genHash(), // data
                                crypto.createPrivateKey({  // private key (need to build an object)
                                    key: wallet.pair.privateKey, // key from buffer
                                    format: "der", // format of key
                                    type: "pkcs8" // type of key
                                })
                            );
    }

    validateTransaction = () => {
        // for miner fee 'fromAddress' is empty so cannot verify
        if (this.fromAddress === null) return true;

        // is the transaction signed?
        if (!this.signature || this.signature.length === 0) throw new Error('Transaction is not signed');

        // return boolean of if transaction signature is verified
        return crypto.verify(
                'sha256', // algorithm
                this.genHash(), //data
                crypto.createPublicKey({ // public key (need to build an object)
                    key: Buffer.from(this.fromAddress, 'hex'), // key from buffer
                    format: 'der', // format of key
                    type:'spki'// type of key
                }), 
                this.signature); // signature
    }

}

// exports
export {Transaction};