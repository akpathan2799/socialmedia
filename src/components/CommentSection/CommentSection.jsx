import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostInfo } from "../../hooks/useGetPostInfo hook/useGetPostInfo";
import Post from "../Post/Post";
import { Avatar, Spinner } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { color } from "framer-motion";
import { useAuth } from "../../hooks/auth hook/useAuth";
import { useAddComment } from "../../hooks/addComment hook/useAddComment";
import { useGetAllComments } from "../../hooks/getAllComments hook/useGetAllComments";
import Comment from "../Comment/Comment";


function CommentSection() {
  const { postId } = useParams();
  const { post, isLoading } = useGetPostInfo(postId);
  const{user,loading:authLoading} = useAuth();
  const { register, handleSubmit ,reset} = useForm();
  const{addComment,commentLoading} = useAddComment();
  const{comments,commentsLoading} = useGetAllComments(postId);
  function handleAddComment(data) {

    addComment({
      comment:data.comment,
      userId:user.id,
      postId
    })
    reset();
    
  
  }

  if(!commentLoading){
    console.log(comments);
  }



  // if(load)

  return (
    <div className="w-full p-2 rounded-md flex flex-col justify-center items-center gap-2">
      {isLoading ? <Spinner color="purple.500" /> : <Post post={post} />}

      <div className="w-full p-2bg-purple-800">
        <div className="w-full  ">
          <form className="w-full" onSubmit={handleSubmit(handleAddComment)}>
            <div className="w-full flex justify-between items-center gap-3 mt-3">
              {
                authLoading?<Spinner color="purple"/>:<Avatar name={user.username} src={user.avatar}></Avatar>
              }
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register('comment',{required:'true'})}
              />
              <Button  colorScheme="purple" type="submit" isLoading={authLoading || commentLoading }>Comment</Button>
            </div>
          </form>

          <div className="w-full p-2">

          {
            
            
              commentsLoading && authLoading?<Spinner color="purple"/>:
              comments.map((comment)=>(
                <Comment data={comment} key={comment.commentId} />
              ))
           
          }

          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
