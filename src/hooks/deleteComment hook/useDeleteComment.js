import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import { useToast } from "@chakra-ui/react";

export  function useDeleteComment(commentId){
    const [commentDeleteLoading,setCommentDeleteLoading] = useState(false);
    const toast = useToast();
    async function deleteComment(){
        await deleteDoc(doc(db,'comments',commentId))
        toast({
            title: `Comment Deleted`,
            
            status: 'success',
            isClosable: true,
            position:'top',
            duration:1000
          });

          setCommentDeleteLoading(false);
    }

    // useDeleteComment();
    return {deleteComment,commentDeleteLoading};
}