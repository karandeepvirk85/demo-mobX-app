import {makeAutoObservable} from 'mobx';
import sha256 from "crypto-js/sha256";
import { createContext,useContext,useEffect, FC } from 'react';

interface IBlock{
    hash:string;
    transactions:Array<string>;
}

class BlockChainStore{

    blocks:Array<IBlock> = [];
    
    transactions: Array<string> = ["Start"];
    
    constructor(){
        makeAutoObservable(this);
    }

    addTransaction(message:string){
        this.transactions.push(message);
    }

    get getNumberOfBlock (){
        return this.blocks.length;
    }

    writeBlock(){
        if(this.transactions.length === 0){
            return;
        }
        const transactions = [...this.transactions];
        this.transactions = [];

        const prevHash = this.blocks[this.blocks.length - 1] ?? {hash: ""}
        const hash = sha256(`${prevHash}${JSON.stringify(transactions)}`).toString();
        this.blocks.push({
            hash,
            transactions,
        });
    }
}


// Create Context
const StoreContext = createContext<BlockChainStore>(new BlockChainStore());

const StoreProvider:FC<{store:BlockChainStore}> = ({store,children}) =>{
    useEffect(()=>{
        const interval = setInterval(()=>{
            store.writeBlock();
        },500);
        return ()=>clearInterval(interval);
    });

    return(
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}

const useStore = () =>{
    return useContext(StoreContext);
}


export{BlockChainStore, useStore, StoreProvider} 