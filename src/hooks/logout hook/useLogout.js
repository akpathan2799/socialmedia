import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function useLogout(){
    const[loading , setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    async function logOut(){
        setLoading(true)
        try {
            await signOut(auth);

            toast({
                title: `Logout Successfull`,
                status: 'success',
                isClosable: true,
                position:'top',
                duration:1000
             });
             navigate('/')
        } catch (error) {

            toast({
                title: `Logout failed`,
                description:error.message,
                status: 'error',
                isClosable: true,
                position:'top',
                duration:1000
             });
            
        }finally{
            setLoading(false)
        }
    }

    return{logOut,loading}

}
  