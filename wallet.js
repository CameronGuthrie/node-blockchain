'use strict'
/*

    THIS IS GOING TO BE HERE FOR NOW

*/

// imports
const crypto = await import('crypto');

const createWallet = () => {

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

    // keys to hex for easy access
    const publicKey = pair.publicKey.toString('hex');
    const privateKey = pair.privateKey.toString('hex');

    return {
        publicKey,
        privateKey,
        pair
    }
}

// exports
export {createWallet};