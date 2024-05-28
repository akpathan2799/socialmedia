import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";
import { Toast, useToast } from '@chakra-ui/react';
export function useAddPost(){
    const [loading , setLoading] = useState(false);
    const id = uuid();
    const toast = useToast();

    async function addPost(post){
        setLoading(true);
        await setDoc(doc(db, "posts",id), {
           ...post,
           date:Date.now(),
           postId:id,
           likes:[]
          });
          setLoading(false);

          toast({
            title: `Posted Successfully`,
            status: 'success',
            isClosable: true,
            position:'top',
            duration:1000
          });

    }
    return{addPost,loading};
  }
  