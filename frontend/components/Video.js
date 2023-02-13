import React from 'react';
import { useRef,useState } from 'react';
import styles from '../styles/Video.module.css'

import Sidebar from '../components/Sidebar'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
 const Video = ({
    address,
    url,
    channel,
    description,
    index,
    likes,
    shares,
    likeVideo,
    likesAddress,
    createComment,
    getComments,
    commentCount,
    connection,
    video
 }) => { 
    const [playing,setPlaying] = useState(false)
    const [showCommentsModal,setShowCommentsModal] = useState(false)
    const videoRef = useRef(null)

    const onVideoPress = () => {
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        }else{
            videoRef.current.load()
            videoRef.current.play()
            setPlaying(true)
            // videoRef.current.load()
            // fetchVideoAndPlay()
            // var playPromise = document.querySelector('video').play();

            //     // In browsers that don’t yet support this functionality,
            //     // playPromise won’t be defined.
            //     if (playPromise !== undefined) {
            //     playPromise.then(function() {
            //         // Automatic playback started!
            //         videoRef.current.play()
            //         setPlaying(true)
            // setPlaying(true)
            //     }).catch(function(error) {
            //         console.log("eeror cannot play video ")
            //         console.log(error)
            //     });
            //     }
            
        }
    }
    function fetchVideoAndPlay() {
        console.log(fetch(videoRef.current.src,{mode:'no-cors'}))
        fetch(videoRef.current.src,{ mode: 'no-cors'})
        .then(response => response.blob())
        .then(blob => {
            console.log(blob)
          videoRef.current.srcObject = blob;
          return videoRef.current.play();
        })
        .then(_ => {
          setPlaying(true)
        })
        .catch(e => {
          console.log("ERRRRRRRRR")
          console.log(e)
        })
      }
    const hideComments = () => { 
        setShowCommentsModal(false);
    }

    const showComments = () => { 
        setShowCommentsModal(true);

    }
    return (
        <div className={styles.wrapper}>
            <video
            
            className={styles.videoPlayer}
            loop
            onClick = {onVideoPress}
            src={url}  ref = {videoRef}
            
            
            style = {{objectFit:'cover'}}
            />
            <Footer
                channel = {channel}
                description = {description}
                song = {index}
            />
            <Sidebar
                address = {address}
                likes = {likes}
                shares = {shares}
                onShowComments = {showComments}
                likeVideo = {likeVideo}
                index = {index}
                likesAddress = {likesAddress}
                messages = {commentCount}
                connection = {connection}
                video = {video}
            />
            {showCommentsModal && (
                <Comments
                    onHide = {hideComments}
                    index = { index}
                    address = {address}
                    createComment = {createComment}
                    getComments = {getComments}
                    commentCount = {commentCount}
                /> 
            )}
        </div>
    )
 }

 export default Video;