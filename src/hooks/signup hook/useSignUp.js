import { query, collection, where, getDocs,doc,setDoc } from "firebase/firestore";
import { db , auth} from "../../firebase";
import { Toast, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
async function userNameExist(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}

export function useSignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  async function signUp({ email, password, username }) {
    setLoading(true)
    const isUserNameExist = await userNameExist(username);
    if (isUserNameExist) {
      toast({
        title: `User name alreay exists try another username`,

        status: "error",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
      setLoading(false);
      return false;


    }else{
        try {
            setLoading(true);

            const response = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db, "users", response.user.uid), {
               id:response.user.uid,
               username:username.toLowerCase(),
               avatar:'',
               date:Date.now(),
              });

              toast({
                title: "Account created Successfully",
                
                status: "success",
                isClosable: true,
                position: "top",
                duration: 1000,
              });
              navigate('/')
              return true;





        
        
        } catch (error) {
    
            toast({
                title: `Sign Up failed`,
                description:error.message,
                status: 'error',
                isClosable: true,
                position:'top',
                duration:1000
              });
              return false
            
        }finally{
            setLoading(false)
        }
    }

    
    
  }

  return { signUp,loading };
}
