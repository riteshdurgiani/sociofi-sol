import React from 'react';
import Signup from './Signup';
import styles from '../styles/MainView.module.css'
import { useEffect,useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { SOLANA_HOST } from '../utils/const';
import { getProgramInstance } from '../utils/utils';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import useAccount from '../hooks/useAccount'
import useVideos from '../hooks/useVideos';
import Video from '../components/Video'
import UploadModal from '../components/UploadModal'
import BottomBar from '../components/BottomBar'
const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const {BN,web3} = anchor
const {SystemProgram} = web3 

const defaultAccounts = {
  tokenProgram : TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId
}



let isAccount = false;
const MainView = () => {

  const [isAccount,setAccount] = useState(false);  
  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const program = getProgramInstance(connection,wallet);
  
  const [videos,setVideos] = useState([])
  const [newVideoShow,setNewVideoShow] = useState(false);
  const [description,setDescription] = useState('');
  const [videoUrl,setVideoUrl] = useState('');
  const [userDetail,setUserDetail] = useState();
  const {getVideos,likeVideo,createComment,newVideo,getComments} = useVideos(
    setVideos,
    userDetail,
    videoUrl,
    description,
    setDescription,
    setVideoUrl,
    setNewVideoShow
  );
  useEffect(() => {
    if(wallet.connected){
      console.log(wallet)
      checkAccount()

      console.log(videos)
      getVideos()
    }
  },[wallet.connected])

  const checkAccount = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'),wallet.publicKey.toBuffer()],
      program.programId,

    )

    try{
      const userInfo = await program.account.userAccount.fetch(user_pda);
      console.log(userInfo);
      setUserDetail(userInfo);
      setAccount(true);
    }catch(e){
     setAccount(false) 
    }
  }
  const {signup} = useAccount()
  
    return(
        <>
         {isAccount ? (
            <div>
                {newVideoShow && (
                  <UploadModal
                  description = {description}
                  videoUrl = {videoUrl}
                  newVideo = {newVideo}
                  setDescription = {setDescription}
                  setVideoUrl = {setVideoUrl}
                  setNewVideoShow = {setNewVideoShow}
                  />
                )}
                <div className={styles.appVideos}>
                  {videos.length === 0 ? (
                      <h1> No Videos </h1>
                  ) : (
                    
                    
                      videos.map((video,id)=>(
                        <Video
                        key = {id}
                        address = {video.publicKey.toBase58()}
                        url = {video.account.videoUrl}
                        channel = {video.account.creatorName}
                        index = {video.account.index.toNumber()}
                        likes = {video.account.likes}
                        description = {video.account.description}
                        likeVideo = {likeVideo}
                        likesAddress = {video.account.peopleWhoLiked}
                        createComment = {createComment}
                        getComments = {getComments}
                        commentCount = {video.account.commentCount.toNumber()}
                        connection = {connection}
                        video = {video}
                        />
                      ))
                  )}
                </div>
               <BottomBar
               setNewVideoShow = {setNewVideoShow}
               getVideos = {getVideos}
               />
            </div>
          ) : (
            <Signup signup = {signup} wallet = {wallet.publicKey.toBase58}/>
          )}
        </>
    ) 
}

export default MainView