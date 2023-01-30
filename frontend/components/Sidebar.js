import React , {useEffect,useState} from "react";
import styles from '../styles/Sidebar.module.css'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/Message'
import ShareIcon from '@material-ui/icons/Share'
import { useWallet } from "@solana/wallet-adapter-react";

const Sidebar = (
  {
    address,
    likes,
    shares,
    messages,
    onShowComments,
    likeVideo,
    index,
    likesAddress
  }
) => { 

    const [liked,setLiked] = useState(false);
    const wallet = useWallet()

    useEffect(()=>{
        if(wallet.connected){
            likesAddress.forEach(address =>{
                if(wallet.publicKey.toBase58() === address.toBase58()){
                    setLiked(true)
                }
            })
        }
    },[wallet,likesAddress])

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
            <div className={styles.sideBarButton} onClick={onShowComments}>
                <ShareIcon
                    fontSize="large"
                />
                
            </div>
            <p>{shares}</p>
        </div>
    )
}

export default Sidebar