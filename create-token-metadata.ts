import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const payer= getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAMID = new web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const TOKEN_MINT_ADDRESS = new web3.PublicKey("8ii7ZX9Sng1P5qbgc5yBqananbumscbbyfcsqBrAUmKA");

const transaction = new web3.Transaction();


const metadataData = {
  name: "Solana Training Token",
  symbol: "TRAINING",
  // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metaDataPDAandBump = web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAMID.toBuffer(),
        TOKEN_MINT_ADDRESS.toBuffer()
    ],
    TOKEN_METADATA_PROGRAMID
);

const metaDataPDA = metaDataPDAandBump[0];

const instructionToCreateMetaData = createCreateMetadataAccountV3Instruction(
    {
        metadata: metaDataPDA,
        mint: TOKEN_MINT_ADDRESS,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
    },
    {
        createMetadataAccountArgsV3 : {
            data: metadataData,
            isMutable: true,
            collectionDetails: null
        }
    }
);


transaction.add(instructionToCreateMetaData);

const signature = await web3.sendAndConfirmTransaction(connection,transaction,[payer]);

const link = getExplorerLink("transaction",signature.toString(),"devnet");
const tokenMintLink = getExplorerLink("address",TOKEN_MINT_ADDRESS.toString(),"devnet");


console.log(`Link for metadata transaction ${link}`);
console.log(`Token mint address link ${tokenMintLink}`);


