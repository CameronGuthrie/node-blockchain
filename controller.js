/*
    Blockchain can only CR and not UD
*/

// imports
import {Blockchain} from './blockchain.js'

// controller for managing endpoint behaviour
class Controller {

    // return all of the blocks in the chain
    getBlocks() {
        return JSON.stringify(Blockchain.props.chain);
    }

    // return the mempool (all pending transactions)
    getMempool() {
        return Blockchain.props.mempool;
    }

    // return block by index
    getBlock(index) {
        return JSON.stringify(Blockchain.methods.getBlock(index));
    }

    // return all transactions in a block
    getTransactions(index) {
        return Blockchain.methods.getBlock(index).transactions;
    }

    // return transaction by id
    getTransaction(txid) {
        let tx;
        for (const block in Blockchain.props.chain){
            for (const transaction in block.transactions) {
                if (transaction.txid === txid) return transaction;
            }
        }
        return `Transaction with id ${txid} not found`;
    }

}

// exports
export {Controller};