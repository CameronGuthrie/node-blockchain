'use strict'

// imports
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import axios from 'axios';

// for now a hardcoded link to the blockchain
const CHAIN = '127.0.0.1:9001';

class Wallet {
    constructor() {
        this.address = String(this.createKeys());
        this.balance = 0;// || Number(this.getBalance());
    }

    // method to generate a new key pair
    createKeys = () => {

        // generates a pair of keys, returns them as buffers
        const pair = crypto.generateKeyPairSync('ec', {
            namedCurve: 'secp256k1',    // Options
            publicKeyEncoding: {
                type: 'spki',
                format: 'der'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'der'
            }
        });
    
        // writes private key to file
        fs.writeFile(
            `${os.homedir}/.nodeWallet`, // create a file in the home directory
            pair.privateKey.toString('hex'), // get the private key as a hex string
            (err) => { // callback
                if (err) throw err; // if there's an error throw it
                delete pair.privateKey; // delete the private key from the pair object
                console.log(`created file ${os.homedir}/.nodeWallet`); // output that a file has been created
            }
        );
        
        // returns public key as a hex string
        return pair.publicKey.toString('hex');
    }
    
    // axios get request to find the balance of the wallet
    getBalance = async () => {
        let res = await axios.get(`${CHAIN}/balance/${this.address}`);
        return res;
    }
}

const testWallet = new Wallet();
// exports
export {Wallet};