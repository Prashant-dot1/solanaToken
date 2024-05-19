import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";

const payer= getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));


const tokenMintAddress = await token.createMint(connection,payer,payer.publicKey,null,2);
console.log(`The token mint address is ${tokenMintAddress}`);