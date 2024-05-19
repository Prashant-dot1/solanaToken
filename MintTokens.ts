import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const payer = getKeypairFromEnvironment("SECRET_KEY");
const TOKEN_MINT_ADDRESS = new web3.PublicKey("8ii7ZX9Sng1P5qbgc5yBqananbumscbbyfcsqBrAUmKA");
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const associatedTokenAddress = new web3.PublicKey("DeLE9VsJD2bcJaBtpVZduz7nPBPbw8JR66saRbKyJN2T");

const txSignature = await token.mintTo(connection,payer,TOKEN_MINT_ADDRESS,associatedTokenAddress,payer.publicKey,10* MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink("transaction",txSignature,"devnet");
console.log(`Mint token transaction : ${link}`);