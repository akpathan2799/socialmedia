import { Button, Heading, Textarea } from "@chakra-ui/react";
import reactTextareaAutosize from "react-textarea-autosize";
import React from "react";
import { useForm } from "react-hook-form";

import {useAuth} from '../../hooks/auth hook/useAuth'
import { useAddPost } from "../../hooks/addpost hook/useAddPost";
import Post from "../Post/Post";
import { useGetPost } from "../../hooks/getPost hook/useGetPost";
import { useDeletePost } from "../../hooks/deletePost hook/useDeletePost";

function Dashboard() {
  const {register,handleSubmit,reset} = useForm();
 const{addPost,loading:postLoading} = useAddPost();
  const {user,loading} = useAuth();
  const{posts,isLoading} = useGetPost();
  console.log(posts);
 
  
  const postFunctionality = (data)=>{

    addPost({
      content:data.content,
      userId:user.id
    })
    
    reset();
  }
  return (
    <div className="w-full min-h-screen">
    <form onSubmit={handleSubmit(postFunctionality)}>
      <div className="w-full flex justify-between items-center py-2 px-4 my-3">
        <Heading size="lg">New Post</Heading>
        <Button colorScheme="purple" variant="solid" type="submit" isLoading={loading || postLoading}>
          Post
        </Button>
      </div>

      <div className="w-full py-2 px-4 my-3">
          <Textarea
            as={reactTextareaAutosize}
            placeholder="Write Your Post Here"
            resize="none"
          {...register('content',{
            required:true,
          })}
          />
      </div>
    </form>


    <div className="w-full py-2 gap-6 flex flex-col items-center justify-start  py-2 px-4 my-3">

          {
            posts?.length === 0 ? <Heading size='md'>Not Posts Found</Heading>:posts?.map((post)=>(<Post key={post.postId} post={post}/>))
          }

    </div>
    </div>
  );
}

export default Dashboard;
