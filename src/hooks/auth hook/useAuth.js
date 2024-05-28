import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
export function useAuth(){

    const [authUser, isLoading, error] = useAuthState(auth);
    const[dataloading,setDataLoading] = useState(true);
    const[user,setUser] = useState();
    console.log(isLoading);
    useEffect(()=>{

        async function fetchData(){
            setDataLoading(true);
            const reference = doc(db,'users',authUser.uid)
            const getDocument = await getDoc(reference)
            setUser(getDocument.data());
            setDataLoading(false);
        }

        if(!isLoading){
            if(authUser){fetchData()}
            else{setDataLoading(false)};
        }

    },[isLoading])

    if(error) throw error
        return {user  , loading : dataloading , error};
}