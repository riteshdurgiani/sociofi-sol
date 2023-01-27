import { clusterApiUrl,PublicKey } from "@solana/web3.js";
import sociofi from './sociofi.json'
export const SOLANA_HOST = clusterApiUrl('devnet')
export const SOCIOFI_PROGRAM_ID = new PublicKey(
    "8PWiG6xmBzFjhuQ4d3eEZeyB46yuGYDsQ5SZFK92jekg"
)

export const SOCIOFI_IDL = sociofi