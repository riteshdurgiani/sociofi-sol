import { clusterApiUrl,PublicKey } from "@solana/web3.js";
import sociofi from './sociofi.json'
export const SOLANA_HOST = clusterApiUrl('devnet')
export const SOCIOFI_PROGRAM_ID = new PublicKey(
    "C9fFYSZ1WnbZNoBo3ap2eUkVY7KsCHwyvoWuQdENhyaE"
)

export const SOCIOFI_IDL = sociofi