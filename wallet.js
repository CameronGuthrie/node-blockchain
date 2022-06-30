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
            type: 'pkcs8', // 'pkcs8',
            format: 'der'
        }
    });

    // convert privateKey buffer to a private key object
    const privateKeyObject = crypto.createPrivateKey({  
        key: pair.privateKey,
        format: "der",
        type: "pkcs8"
    });

    // keys to hex for easy access
    const publicKey = pair.publicKey.toString('hex');
    const privateKey = pair.privateKey.toString('hex');

    return {
        publicKey,
        privateKey,
        privateKeyObject,
        pair
    }
}
const wallet1 = createWallet();
const wallet2 = createWallet();

// create a public key object from a private key object
const pubFromPriv = key => crypto.createPublicKey(key);

// convert public key from object to hex
const publicKeyToHex = key => key.export({format: 'buffer', type : 'spki', format : 'der'}).toString('hex');

console.log(publicKeyToHex(pubFromPriv(wallet1.privateKeyObject)) === wallet1.publicKey);

