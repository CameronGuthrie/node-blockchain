'use strict'

// imports
import {Block} from './block.js'

const Blockchain = {
    props: {
        chain: []
    },
    methods: {
        setFirstBlock: () => Blockchain.props.chain.push(new Block(0, Date.now(), `We are number one!`, ``)),
        getLatestBlock: () => Blockchain.props.chain[Blockchain.props.chain.length - 1],
        setNewBlock: (newBlock) => {
            newBlock.previousHash = Blockchain.methods.getLatestBlock().hash;
            newBlock.hash = newBlock.genHash();
            Blockchain.props.chain.push(newBlock);
        },
        checkChain: () => {
            for (let i = 1; i < Blockchain.props.chain.length; i++) {
                const currentBlock = Blockchain.props.chain[i];
                const previousBlock = Blockchain.props.chain[i - 1];
                if (currentBlock.hash !== currentBlock.genHash()) return false;
                if (currentBlock.previousHash !== previousBlock.hash) return false;
                return true;
            }
        }
    }
}

// exports
export {Blockchain};