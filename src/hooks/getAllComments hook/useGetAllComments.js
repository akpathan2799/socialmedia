import { query,collection,orderBy, where } from "firebase/firestore";
import{db} from '../../firebase'
import { useCollectionData } from "react-firebase-hooks/firestore";
export function useGetAllComments(postId){

    const q =query(collection(db, "comments"),where('postId','==',postId), orderBy("date", "desc"));
    const [comments, commentsLoading, error] = useCollectionData(q);
    if (error) throw error;
    return { comments, commentsLoading };
    
}