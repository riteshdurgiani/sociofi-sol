import React , {useEffect,useState} from "react";
import styles from '../styles/Sidebar.module.css'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/Message'
import ShareIcon from '@material-ui/icons/Share'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/const";
import { PublicKey } from "@solana/web3.js";
const web3 =  require("@solana/web3.js")
const anchor = require('@project-serum/anchor')
const Sidebar = (
  {
    address,
    likes,
    shares,
    messages,
    onShowComments,
    likeVideo,
    index,
    likesAddress,
    connection,
    video
  }
) => { 

    const [liked,setLiked] = useState(false);
    const wallet = useWallet()
    const { publicKey, sendTransaction } = useWallet();
    useEffect(()=>{
        if(wallet.connected){
            console.log("WALLETTTT")
            console.log(wallet)
            likesAddress.forEach(address =>{
                if(wallet.publicKey.toBase58() === address.toBase58()){
                    setLiked(true)
                }
            })
        }
    },[wallet,likesAddress]);

    async function sendSolana() {
        //TODO : Create a wallet select button on the header and display balance solana on the header 
        //Refer facebook video  use WalletMultiButton : )
        
       try{
        console.log(publicKey)
        console.log(address)
        console.log(video)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: video.account.authority,
              lamports: 10_000_000,
            })
          );
          const signature = await sendTransaction(transaction, connection);

          await connection.confirmTransaction(signature, "processed");

          alert("SOL sent successfully ")
       }catch(e){
        alert("OOps Transaction cancelled  ")
       }
        
    }
    return (
        <div className={styles.sidebar}>
            <div className={styles.sideBarButton}>
                {liked ? (
                    <FavoriteIcon
                        fontSize="large"
                        style={{fill:'red',stroke:'red'}}
                    />
                ): (
                    <FavoriteIcon
                        fontSize="large"
                        onClick={e => {
                            likeVideo(address)
                          }}
                    />
                )}
                <p>{likes}</p>
            </div>
            <div className={styles.sideBarButton} onClick={onShowComments}>
                <MessageIcon
                    fontSize="large"
                />
               
            </div>
            <p>{messages}</p>
            <div className={styles.sideBarButton} >
                <MonetizationOnIcon
                onClick = {sendSolana}
                    fontSize="large"
                />
                
            </div>
            <p>{shares}</p>
        </div>
    )
}

export default Sidebar