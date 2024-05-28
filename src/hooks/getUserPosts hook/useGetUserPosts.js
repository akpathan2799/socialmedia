import { query , collection , orderBy , where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
export function useGetUserPosts(userId) {
  const q =query(
    collection(db, "posts"),
    orderBy("date", "desc"),
    where("userId", "==", userId)
  )

  const [posts,postsLoading,error] = useCollectionData(q);
  if(error){
    throw error;
  }

  return{posts , postsLoading};

}
