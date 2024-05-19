import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const payer = getKeypairFromEnvironment("SECRET_KEY");
const TOKEN_MINT_ADDRESS = new web3.PublicKey("8ii7ZX9Sng1P5qbgc5yBqananbumscbbyfcsqBrAUmKA");

const assocuatedTokenAccount = 
await token.getOrCreateAssociatedTokenAccount(connection,payer,TOKEN_MINT_ADDRESS,payer.publicKey);


const link = getExplorerLink("address",assocuatedTokenAccount.address.toBase58(),"devnet");
console.log(`This is an associated token account ${link}`)