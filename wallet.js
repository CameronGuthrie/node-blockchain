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

// validate wallet
const validateWallet = wallet => {
    // convert privateKey buffer to a private key object
    const privateKeyObject = crypto.createPrivateKey({  key: wallet.pair.privateKey, format: "der",type: "pkcs8"});

    // create a public key object from a private key object
    const publicKeyObject = crypto.createPublicKey(privateKeyObject);

    // convert public key object to hex
    const publicKeyHex = publicKeyObject.export({format: 'buffer', type : 'spki', format : 'der'}).toString('hex');

    // compare generated hex public key to wallet hex public key
    return publicKeyHex === wallet.publicKey;
}

// exports
export {createWallet, validateWallet};