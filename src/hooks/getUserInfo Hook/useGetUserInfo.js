
import { useState } from "react";
import { db } from "../../firebase";
import { query,doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
export function useGetUserInfo(userId){

    const q = query(doc(db, "users", userId));
    const [user, userLoading] = useDocumentData(q);
    return { user, userLoading };
   

}