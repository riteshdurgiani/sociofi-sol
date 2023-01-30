import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const {BN,web3} = anchor
const {SystemProgram} = web3

const defaultAccounts = {
    tokenProgram : TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram : SystemProgram.programId
}

const useVideos = (
    setVideos,
    userDetail,
    videoUrl,
    description,
    setDescription,
    setVideoUrl,
    setNewVideoShow,
) => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection,wallet);

    const getVideos = async () => { 
        const videos = await program.account.videoAccount.all();
        //save all videos in state for frontend 
        setVideos(videos)
    }

    // functionto call likeVideo from smart contract 
    const likeVideo = async (address) => { 
        console.log('video Liked !')
        const tx = await program.rpc.likeVideo({
            accounts : {
                video : new PublicKey(address),
                authority : wallet.publicKey,
                ...defaultAccounts,
            },
        })
        console.log(tx)
    }

    //function to call getComment from smart contract 
    const createComment = async(address,count,comment) => { 
        let [comment_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('comment'),
            new PublicKey(address).toBuffer(),
            new BN(count).toArrayLike(Buffer,'be',8),
        ],
        program.programId,
        )
        if(userDetail){
            const tx = await program.rpc.createComment(
                comment,
                userDetail.userName,
                userDetail.userProfileImageUrl,
                {
                    accounts: {
                        video : new PublicKey(address),
                        comment : comment_pda,
                        authority : wallet.publicKey,
                        ...defaultAccounts,
                    },
                }
            )
            console.log(tx)
        }
    }

    // Function to call create video from smart Contract 
    const newVideo = async() => {
        const randomKey = anchor.web3.Keypair.generate().publicKey;

        let [video_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('video'),randomKey.toBuffer()],
            program.programId,

        )

        const tx = await program.rpc.createVideo(
            description,
            videoUrl,
            userDetail.userName,
            userDetail.userProfileImageUrl,
            {
                accounts : { 
                    video : video_pda,
                    randomkey : randomKey,
                    authority : wallet.publicKey,
                    ...defaultAccounts,
                }
            }
        )
        console.log(tx);

        setDescription('')
        setVideoUrl('')
        setNewVideoShow(false)
    }
    //Function to fetch comments fron the commentAccount on the smart contract 
    const getComments = async(address,count) => {
        let commentSigners = [];
        for(let i=0;i<count;i++){
            let [commenSigner] = await  anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode('comment'),
                    new PublicKey(address).toBuffer(),
                    new BN(i).toArrayLike(Buffer,'be',8)
                ],
                program.programId,
            )
            commentSigners.push(commenSigner)
        }
        const comments = await program.account.commentAccount.fetchMultiple(
            commentSigners,
        )
        console.log(comments)
        return comments;
    }

    return {getVideos,likeVideo,createComment,newVideo,getComments}
}

export default useVideos;