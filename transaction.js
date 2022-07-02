'use strict'

// imports
const crypto = await import('crypto');
import {blockchain} from './app.js';

class Transaction {
    constructor (fromAddress, toAddress, amount) {
        this.fromAddress = String(fromAddress); // sending from wallet address
        this.toAddress = String(toAddress); // sending to wallet address
        this.amount = Number(amount); // how much is being sent
        this.timestamp = this.getTime(); // time of transaction
        this.txid = this.genHash(); // hash of transaction
    }

    // method to hash the transaction from node.js crypto lib
    genHash = () => crypto.createHash('sha256').update(
            this.toAddress.toString() + 
            this.timestamp.toString() +
            this.amount.toString()).digest('hex');

    // method to return a date as number of miliseconds from epoch in UTC 
    getTime = () => new Date()[Symbol.toPrimitive]('number');

    // sign the transaction
    signTransaction = (walletAddress, privateKey) => {
        // check the sender public key is the one used
        // right now this just checks the public key matches the 'fromAddress'
        if (walletAddress !== this.fromAddress) throw new Error('Cannot sign from wallet address provided');
        // check the wallet has enough balance for transaction
        if (this.amount > blockchain.getAddressBalance(this.fromAddress)) throw new Error('Not enough funds in wallet');
        //sign the transaction (need to create a private key object)
        this.signature =    crypto.sign(
                                'sha256', // algorithm
                                Buffer.from(this.txid, 'hex'), // data
                                crypto.createPrivateKey({  // private key (need to build an object)
                                    key: Buffer.from(privateKey, 'hex'), // key from buffer
                                    format: "der", // format of key
                                    type: "pkcs8" // type of key
                                })
                            );
    }

    // validate the transaction
    validateTransaction = () => {
        // check if anything is being sent
        if (Number.isNaN(this.amount) || this.amount === null || this.amount <= 0) throw new Error(`Invalid amount "${this.amount}"`);
        // check if the from address matches the to address
        if (this.fromAddress === this.toAddress) throw new Error('Cannot send to self');
        // for miner fee 'fromAddress' is 'reward' so cannot verify
        if (this.fromAddress === 'reward') return true;
        // is the transaction signed?
        if (!this.signature || this.signature.length === 0) throw new Error('Transaction is not signed');
        // return boolean of if transaction signature is verified
        return  crypto.verify(
                    'sha256', // algorithm
                    Buffer.from(this.txid, 'hex'), //data
                    crypto.createPublicKey({ // public key (need to build an object)
                        key: Buffer.from(this.fromAddress, 'hex'), // key from buffer
                        format: 'der', // format of key
                        type:'spki'// type of key
                    }), 
                    this.signature // signature
                ); 
    }

}

// exports
export {Transaction};