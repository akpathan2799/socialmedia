import { deleteDoc, doc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
// import { qu } from "@testing-library/react";
import { query } from "firebase/firestore";
import { collection , getDocs } from "firebase/firestore";
export function useDeletePost(postId){

    const toast = useToast();
    const [deleteLoading , setDeleteLoading] = useState(false);

    async function deletePost(){
        setDeleteLoading(true);

        // Delete post document
      await deleteDoc(doc(db, "posts", postId));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", postId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Post deleted!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });


        
          setDeleteLoading(false);
    }

    return {deletePost,deleteLoading};
    

}