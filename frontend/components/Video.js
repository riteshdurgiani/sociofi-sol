import React from 'react';
import { useRef,useState } from 'react';
import styles from '../styles/Video.module.css'
import ReactPlayer from 'react-player'
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
 }) => { 
    const [playing,setPlaying] = useState(false)
    const [showCommentsModal,setShowCommentsModal] = useState(false)
    const videoRef = useRef(null)

    const onVideoPress = () => {
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        }else{
            // videoRef.current.play()
            // setPlaying(true)
            // videoRef.current.load()
            // fetchVideoAndPlay()
            var playPromise = document.querySelector('video').play();

                // In browsers that don’t yet support this functionality,
                // playPromise won’t be defined.
                if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Automatic playback started!
                    videoRef.current.play()
            setPlaying(true)
                }).catch(function(error) {
                    console.log("eeror cannot play video ")
                    console.log(error)
                });
                }
            
        }
    }
    function fetchVideoAndPlay() {
        fetch(videoRef.current.src,{ mode: 'no-cors'})
        .then(response => response.blob())
        .then(blob => {
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
            id='video'
            className={styles.videoPlayer}
            loop
            onClick = {onVideoPress}
            src={url}  ref = {videoRef}
           
            
            style = {{objectFit:'cover'}}
            />
                
            
            {showCommentsModal && (
                <Comments/> 
            )}
        </div>
    )
 }

 export default Video;