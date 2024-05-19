import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const payer = getKeypairFromEnvironment("SECRET_KEY");
const TOKEN_MINT_ADDRESS = new web3.PublicKey("8ii7ZX9Sng1P5qbgc5yBqananbumscbbyfcsqBrAUmKA");
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const receiversPublicKey = new web3.PublicKey("58XNJQu6q7YKwQpn4L3BvxBJcmGpuCfyzA3uYVdpFiVh");


// get associated token account address of sender
const ATAsender = await token.getOrCreateAssociatedTokenAccount(connection,payer,TOKEN_MINT_ADDRESS,payer.publicKey);

// get associated token account address of receiver
const ATAreceiver = await token.getOrCreateAssociatedTokenAccount(connection,payer,TOKEN_MINT_ADDRESS,receiversPublicKey);

const txSignature = await token.transfer(connection,payer,ATAsender.address,ATAreceiver.address,payer.publicKey,5*MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink("transaction",txSignature,"devnet");

console.log(`Transaction link to transfer tokens from sender to receiver's token account ${link}`)