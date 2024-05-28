import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { useToast } from "@chakra-ui/react";
export function useAddComment(){

    const[commentLoading , setCommentLoading] = useState(false);
    const commentId = uuid();
    const toast = useToast();
    async function addComment(comment){

        setCommentLoading(true);
        await setDoc(doc(db,'comments',commentId),{
            ...comment,
            commentId,
            date:Date.now()

        })
        toast({
            title: `Comment Added`,
           
            status: 'success',
            isClosable: true,
            position:'top',
            duration:1000
          });
        
        setCommentLoading(false);

    }

    return{addComment,commentLoading};
}