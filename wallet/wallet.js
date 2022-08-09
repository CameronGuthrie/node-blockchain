'use strict'

// imports
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
// import axios from 'axios';

// where is the home directory?
let homedir = `${os.homedir}`;
const HOME = homedir.replaceAll('\\','/');

// for now a hardcoded link to the blockchain
// const CHAIN = '127.0.0.1:9001';

class Wallet {
    constructor(password) {
        this.address = String(this.createKeys(password));
        this.balance = 0;// || Number(this.getBalance());
    }

    // method to generate a new key pair
    createKeys = password => {

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

        this.encryptPrivateKey(password, pair.privateKey.toString('hex'), `${HOME}/.nodeWallet`);
        
        // returns public key as a hex string
        return pair.publicKey.toString('hex');

    }

    login = password =>  {

        try{
            this.decryptPrivateKey(password, `${HOME}/.nodeWallet`);
        } catch (err) {
            console.error(err);
        }

    }

    changePassword = (oldPassword, newPassword) => {
        const decrypted = this.decryptPrivateKey(oldPassword, `${HOME}/.nodeWallet`);
        console.log(decrypted);
        this.encryptPrivateKey(newPassword, decrypted, `${HOME}/.nodeWallet`);
    }

    encryptPrivateKey = (password, privateKey, location) => {

        // Use the async `crypto.scrypt()` instead.
        const key = crypto.scryptSync(password, 'salt', 32);

        // The IV is usually passed along with the ciphertext.
        const iv = crypto.randomBytes(16); // Initialization vector.

        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(privateKey, 'hex', 'hex');
        encrypted += cipher.final('hex');
        
        // writes private key to file
        fs.writeFile(
            location, // create a file in the home directory
            `${encrypted}:${iv.toString('hex')}`,//=${key.toString('hex')}`,
            //pair.privateKey.toString('hex'), // get the private key as a hex string
            (err) => { // callback
                if (err) throw err; // if there's an error throw it
                console.log(`created file ${location}`); // output that a file has been created
            }
        );

    }

    decryptPrivateKey = (password, location) => {

        fs.readFile(location, (err, data) => {
            if (err) throw err;

            const encrypted = data.toString().split(':')[0].toString('hex');

            // Use the async `crypto.scrypt()` instead.
            const key = crypto.scryptSync(password, 'salt', 32);
            // The IV is usually passed along with the ciphertext.
            const iv = Buffer.from(data.toString().split(':')[1], 'hex'); // Initialization vector.
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

            let decrypted = decipher.update(encrypted, 'hex', 'hex');
            decrypted += decipher.final('hex');

            this.verifyPrivateKey(decrypted) ? decrypted : console.err('Key mismatch');

        });

    }

    verifyPrivateKey = decrypted => {

        const privateKey = crypto.createPrivateKey({
            key : Buffer.from(decrypted, 'hex'),
            type: 'pkcs8',
            format: 'der'
        })

        const publicKeyObj = crypto.createPublicKey({
            key : privateKey,
            type: 'spki',
            format : 'der'
        });

        const publicKey = publicKeyObj.export({
            type: 'spki',
            format: 'der'
        })

        return publicKey.toString('hex') === this.address;

    }

    // axios get request to find the balance of the wallet
    // getBalance = async () => {
    //     let res = await axios.get(`${CHAIN}/balance/${this.address}`);
    //     return res;
    // }

}

const testWallet = new Wallet('hello');

testWallet.login('hello');

testWallet.changePassword('hello', 'goodbye');

testWallet.login('goodbye');

// exports
export {Wallet};