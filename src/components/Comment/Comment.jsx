import { Avatar, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { useGetUserInfo } from "../../hooks/getUserInfo Hook/useGetUserInfo";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../hooks/auth hook/useAuth";
import { useDeleteComment } from "../../hooks/deleteComment hook/useDeleteComment";
function Comment(data) {
  const { comment, commentId, date, postId, userId } = data.data;
  const { user, userLoading } = useGetUserInfo(userId);
  const { user: loggedInUser, loading: loggedInUserLoading } = useAuth();
  const { commentDeleteLoading, deleteComment } = useDeleteComment(commentId); // Use the correct hook function

  return (
    <div className=" my-4 w-full  p-3 flex gap-2  ">
      <div className="">
        {userLoading ? (
          <></>
        ) : (
          <Avatar size="sm" name={user.username} src={user.avatar} />
        )}
      </div>
      <div className="flex flex-col w-full">
        {userLoading ? (
          <></>
        ) : (
          <div className="flex justify-between items-center">
            <div className="border-b-[1px] border-gray-400 w-full">
              <p className=" text-purple-600 ">{user.username}</p>
              <p className=" text-gray-400 font-thin">
                {formatDistanceToNow(date)} ago
              </p>
            </div>

            {!userLoading &&
              !loggedInUserLoading &&
              loggedInUser.id == userId && (
                <IconButton
                  isRound={true}
                  isLoading={commentDeleteLoading}
                  variant="ghost"
                  colorScheme="red"
                  onClick={deleteComment}
                  aria-label="Ci Heart"
                  fontSize="20px"
                  icon={<MdDelete />}
                />
              )}
          </div>
        )}

        {userLoading ? <></> : <div>{comment}</div>}
      </div>
    </div>
  );
}

export default Comment;
