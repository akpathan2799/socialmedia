import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { query } from "firebase/firestore";
export function useGetPostInfo(postId){

    const q = query(doc(db, "posts", postId));
    const [post, isLoading] = useDocumentData(q);
  
    return { post, isLoading };

}
  