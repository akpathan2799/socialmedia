import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
export function useLikeToogle({isLiked,userId,postId}){
    const [likeLoading,setLikeLoading] = useState(false);

    async function likeToogle(){
        setLikeLoading(true)
        const docRef = doc(db,'posts',postId);
        await updateDoc(docRef,{
            likes : isLiked?arrayRemove(userId):arrayUnion(userId)
        })
        setLikeLoading(false);

    }

    return{likeLoading,likeToogle}

}