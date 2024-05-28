
import { useState } from "react";
import {useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase";
import { query } from "firebase/firestore";
import { collection , orderBy, } from "firebase/firestore";

export function useGetPost(){

    

    const q =query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };



}
  