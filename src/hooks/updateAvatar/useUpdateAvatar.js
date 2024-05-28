import { useState } from "react";
import { doc ,updateDoc } from "firebase/firestore";
import { db , storage } from "../../firebase";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import {storage} from 'firebase/storage'
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

  export function useUpdateAvatar(uid) {
    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function updateAvatar() {
      if (!file) {
        toast({
          title: "No file selected",
          description: "Please select a file to upload",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
  
        return;
      }
  
      setLoading(true);
  
      const fileRef = ref(storage, "avatars/" + uid);
      await uploadBytes(fileRef, file);
  
      const avatarURL = await getDownloadURL(fileRef);
  
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { avatar: avatarURL });
  
      toast({
        title: "Profile updated!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
  
      navigate(0);
    }
  
    return {
      setFile,
      updateAvatar,
      isLoading,
      fileURL: file && URL.createObjectURL(file),
    };
  }