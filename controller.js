/*
    Blockchain can only CR and not UD
*/

// imports
import {Blockchain} from './blockchain.js'

// controller for managing endpoint behaviour
class Controller {

    // return all of the blocks in the chain
    getChain() {
        return Blockchain.props.chain;
    }

    // return the mempool (all pending transactions)
    getMempool() {
        return Blockchain.props.mempool;
    }

    // return block by hash
    getBlock(hash) {
        for (const block of Blockchain.props.chain){
            if (block.hash === hash) return block;
        }
        return `Block with index ${index} not found`;
    }

    // return all transactions in a block
    getTransactions(index) {
        return Blockchain.methods.getBlock(index).transactions;
    }

    // return transaction by id (hash)
    getTransaction(txid) {
        for (const block of Blockchain.props.chain){
            for (const transaction of block.transactions) {
                if (transaction.txid === txid) return transaction;
            }
        }
        return `Transaction with id ${txid} not found`;
    }

}

// exports
export {Controller};