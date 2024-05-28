import React from "react";
import { useGetUserInfo } from "../../hooks/getUserInfo Hook/useGetUserInfo";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Avatar, Link, Spinner } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useLikeToogle } from "../../hooks/like hook/useLikeToogle";
import { useAuth } from "../../hooks/auth hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useAddComment } from "../../hooks/addComment hook/useAddComment";
import { useGetAllComments } from "../../hooks/getAllComments hook/useGetAllComments";
import { useDeletePost } from "../../hooks/deletePost hook/useDeletePost";
function Post({ post }) {
  const {user:loggedInUser , loading:loggedInUserLoading} = useAuth();
  const { content, date, likes, postId, userId } = post;
  const {comments,commentsLoading} = useGetAllComments(postId);
  const { user, userLoading } = useGetUserInfo(userId);
  const isLiked = likes.includes(loggedInUser?.id)
  const{likeLoading,likeToogle} = useLikeToogle({isLiked,userId:loggedInUser?.id,postId});
  const{deletePost , deleteLoading} = useDeletePost(postId);
 
  const navigate = useNavigate()

  return (
    <div className="w-full rounded-sm border-purple-300 border-[1px]  rounded-lg p-2">
      <div className="flex gap-2 items-center border-b-[1px] border-purple-300 py-2">
        {userLoading ? (
          <Spinner color="purple.500" />
        ) : (
          <Avatar size="md" name={user.username} src={user.avatar}></Avatar>
        )}

        <div className="flex flex-col gap-[2px] items-start ">
          {userLoading ? (
            <Spinner color="purple.500" />
          ) : (
            <>
              <Link
                as={ReactRouterLink}
                fontWeight="semibold"
                textDecoration="underline"
                color="purple"
                to={`/protected/profile/${userId}`}
              >
                {user.username}
              </Link>

              <p className="text-sm text-gray-500 ">
                {formatDistanceToNow(date)} ago
              </p>
            </>
          )}
        </div>
      </div>
      <div className=" my-2 min-h-11 break-words">
        <Text>{content}</Text>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
        <div className="flex items-center ">
          
        <IconButton
            isRound={true}
            variant="ghost"
            colorScheme="red"
            onClick={likeToogle}
            aria-label="Ci Heart"
            fontSize="20px"
            icon={isLiked?<FaHeart/>:<CiHeart/>}
          />

          <p>{likes.length}</p>

        </div>
        <div className="flex items-center">
        <IconButton
            isRound={true}
            variant="ghost"
            colorScheme="blue"
            onClick={()=>navigate(`/protected/post/${post.postId}`)}
            aria-label="Ci Heart"
            fontSize="20px"
            icon={comments?.length > 0?<FaComment/>:<FaRegComment/>}
          />

          <p>{comments?.length}</p>


        </div>
         
        </div>
        <div>
        {(!loggedInUserLoading) && (loggedInUser.id === userId) &&(
          <IconButton
            isRound={true}
            variant="ghost"
            
            colorScheme="red"
            onClick={deletePost}
           isLoading={deleteLoading}
            fontSize="20px"
            icon={<MdDelete/>}
          />

        )}

        </div>
      </div>
    </div>
  );
}

export default Post;
