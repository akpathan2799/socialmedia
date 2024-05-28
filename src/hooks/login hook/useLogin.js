import { useToast } from '@chakra-ui/react';
import {auth} from '../../firebase'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function useLogin(){
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    


    async function login({email,password}){
        setLoading(true);


        try {
           const result =  await signInWithEmailAndPassword(auth,email,password);
           console.log(result);
            toast({
                title: `logged in successfully`,
                status: 'success',
                isClosable: true,
                position:'top',
                duration:1000
              });

              navigate('/protected/dashboard')

        } catch (error) {
            
            toast({
                title: `Login Failed`,
                description:error.message,
                status: 'error',
                isClosable: true,
                position:'top',
                duration:1000
              });
            
        }finally{
            setLoading(false);
        }




    }

    return{loading,login};
}