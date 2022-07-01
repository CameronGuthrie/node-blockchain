'use strict'


/*
    START OF DUMMY DATA
*/

// imports
import {Blockchain} from './blockchain.js';
import {Transaction} from './transaction.js';
import * as wallet from './wallet.js';

// if there are no blocks build a genesis block
if (!Blockchain.props.chain.length) Blockchain.methods.buildFirstBlock();

// create some wallets
const miningWallet = wallet.createWallet();

const walletOne = wallet.createWallet();
const walletTwo = wallet.createWallet();
const walletThree = wallet.createWallet();

// create some transactions
const tx1 = new Transaction(walletOne.publicKey, walletTwo.publicKey, 10);
tx1.signTransaction(walletOne);
Blockchain.methods.addToMempool(tx1);

// mine block with transactions
Blockchain.methods.buildNewBlock(miningWallet.publicKey);

// create MORE transactions
const tx2 = new Transaction(walletThree.publicKey, walletOne.publicKey, 5);
tx2.signTransaction(walletThree);
Blockchain.methods.addToMempool(tx2);

const tx3 = new Transaction(walletTwo.publicKey, walletThree.publicKey, 12);
tx3.signTransaction(walletTwo);
Blockchain.methods.addToMempool(tx3);

// mine block with transactions
Blockchain.methods.buildNewBlock(miningWallet.publicKey);


/*
    END OF DUMMY DATA
*/

// imports
import {Controller} from './controller.js';
const controller = new Controller();
const http = await import('http');
//const bodyParser = await import('body-parser');
const PORT = process.env.PORT || 9001;
const STARTMESSAGE = process.env.STARTMESSAGE || `Server listening on port ${PORT}`;

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/helloworld':
            // write the response body
            res.write('<h1>Hello world!</h1>');
            // end the response
            res.end();
            break;
        case '/blockchain':
            // write the response head
            res.writeHead(200, {'Content-Type' : 'application/json'});
            // write the response body
            res.write(controller.getBlocks());
            // end the response
            res.end();
            break;
        case '/mempool':
            // write the response head
            res.writeHead(200, {'Content-Type' : 'application/json'});
            // write the response body
            res.write(controller.getMempool());
            // end the response
            res.end();
            break;
        case '/block/:id':
            // write the response head
            res.writeHead(200, {'Content-Type' : 'application/json'});
            // write the response body
            res.write(controller.getBlock(req.url.params.id));
            // end the response
            res.end();
            break;
        default:
            res.write(STARTMESSAGE);
            // end the response
            res.end();
            break;
    }
    
  });
  server.on('clientError', (err, socket) => {
    console.error(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
  server.listen(PORT, () => console.log(STARTMESSAGE));
