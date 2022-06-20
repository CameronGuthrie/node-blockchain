'use strict'

// imports
import {Block} from './block.js'

const Blockchain = {
    props: {
        chain: []
    },
    methods: {

        setFirstBlock: () => Blockchain.methods.addBlock(new Block(0, `Genesis Block`, ``, 0)),

        getLatestBlock: () => Blockchain.props.chain[Blockchain.props.chain.length - 1],

        setNewBlock: (data) => {
            const block = new Block(Blockchain.props.chain.length, data, Blockchain.methods.getLatestBlock().hash, 0);
            const newBlock = Blockchain.methods.mineBlock(block);
            Blockchain.methods.validateBlock(newBlock) ? 
                Blockchain.methods.addBlock(newBlock) : 
                console.error('invalid block');
        },

        addBlock (newBlock) {
            Blockchain.props.chain.push(newBlock);
            console.dir(newBlock);
        },

        validateBlock: (newBlock) => {
            const latestBlock = Blockchain.methods.getLatestBlock();
            if (newBlock.hash !== newBlock.genHash()) return false;
            if (latestBlock.hash !== newBlock.previousHash) return false;
            return true;
        },

        validateChain: () => {
            if (index == 0) return true;
            for (let i = 1; i < Blockchain.props.chain.length; i++) {
                const currentBlock = Blockchain.props.chain[i];
                const previousBlock = Blockchain.props.chain[i - 1];
                if (currentBlock.hash !== currentBlock.genHash()) return false;
                if (currentBlock.previousHash !== previousBlock.hash) return false;
                return true;
            }
        },

        proofOfWork: (hash) => { // make this complicated later
            // for example: the hash must start with...
            const constraint = '0000';
            return constraint === hash.slice(0,constraint.length);
        }, 

        nextN: block => {
            block.nOnce++;
            block.hash = block.genHash();
            return block;
        },

        mineBlock: (block) => {
            function mine(block) {
                const newBlock = Blockchain.methods.nextN(block);
                return Blockchain.methods.proofOfWork(newBlock.hash) ? newBlock : () => mine(Blockchain.methods.nextN(block));
            }
            return Blockchain.methods.trampoline(mine(Blockchain.methods.nextN(block)));
        },

        // should maybe add ...args back in here later
        trampoline: fn => {
            let res = fn;
            while(typeof res === 'function') {
                res = res();
            }
            return res;
        }
    }
}

// exports
export {Blockchain};