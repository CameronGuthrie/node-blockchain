'use strict'

// imports
import {Block} from './block.js'

const Blockchain = {
    props: {
        chain: []
    },
    methods: {

        setFirstBlock: () => Blockchain.props.chain.push(new Block(0, `Genesis Block`, ``, 0)),

        getLatestBlock: () => Blockchain.props.chain[Blockchain.props.chain.length - 1],

        setNewBlock: (data) => {
            const block = new Block(Blockchain.props.chain.length, data, Blockchain.methods.getLatestBlock().hash, 0);
            Blockchain.props.chain.push(Blockchain.methods.mineBlock(block));
        },

/*
        // this isn't being used yet
        checkChain: () => {
            if (index == 0) return true;
            for (let i = 1; i < Blockchain.props.chain.length; i++) {
                const currentBlock = Blockchain.props.chain[i];
                const previousBlock = Blockchain.props.chain[i - 1];
                if (currentBlock.hash !== currentBlock.genHash()) return false;
                if (currentBlock.previousHash !== previousBlock.hash) return false;
                return true;
            }
        },
*/

        checkConstraint: (hash) => { // make this complicated later
            const constraint = 'I am a string';
            return typeof(constraint) === typeof(hash) ? true : false;
        }, 

        nextN: block => {
            block.n++;
            block.genHash();
            return block;
        },

        mineBlock: (block) => {
            function mine(block) {
                const newBlock = Blockchain.methods.nextN(block);
                return Blockchain.methods.checkConstraint(newBlock.hash) ? newBlock : () => mine(Blockchain.methods.nextN(block));
            }

            return mine(Blockchain.methods.nextN(block));

            // fix trampoline before using this
            // return Blockchain.methods.trampoline(mine(Blockchain.methods.nextN(block)));
        },

        // HOW DO I GET THIS TO STOP RETURNING ANONYMOUS FUNCTIONS!?!?!?!!!!!
        trampoline: fn => (...args) => { 
            let res = fn(...args);
            while(typeof res === 'function') {
                res = res();
            }
            return res;
        }
    }
}

// exports
export {Blockchain};