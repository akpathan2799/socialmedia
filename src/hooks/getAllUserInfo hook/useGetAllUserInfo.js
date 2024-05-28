import { useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";

export function useGetAllUserInfo(){
    const [allUsers, allUsersLoading] = useCollectionData(collection(db, "users"));
  return { allUsers, allUsersLoading };
}