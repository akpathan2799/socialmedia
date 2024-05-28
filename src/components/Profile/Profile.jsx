import React from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { useGetUserPosts } from "../../hooks/getUserPosts hook/useGetUserPosts";
import { useGetUserInfo } from "../../hooks/getUserInfo Hook/useGetUserInfo";
import { useAuth } from "../../hooks/auth hook/useAuth";
import { format } from "date-fns";
import { Avatar, Button, Code, Spinner } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import EditProfile from "../EditProfile/EditProfile";
function Profile() {
  const { userId } = useParams();
  const { posts, postsLoading } = useGetUserPosts(userId);
  const { user, userLoading } = useGetUserInfo(userId);
  const { user: loggedInUser, loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="w-full min-h-screen p-3">
      {userLoading && postsLoading && loading ? (
        <Spinner color="purple" />
      ) : (
        <>
          <div className="flex gap-3 items-center p-4 border-b-[1px]  flex-wrap border-purple-500 my-4">
            <Avatar name={user?.username} src={user?.avatar} size="2xl" />
            <div className="flex flex-col gap-2 w-full max-[500px]:block">
              <Code
                fontSize="larger"
                className="  font-bold"
                backgroundColor="white"
              >
                @{user?.username}
              </Code>
              <div className="flex gap-3 justify-between items-center ">
                <div className="w-full">
                  <p className="font-semibold">Posts : {posts?.length}</p>
                  <p className="font-semibold">
                    Joined on :{format(user.date, "MMMM YYY")}
                  </p>
                </div>
              </div>
              {/* <Button marginLeft='auto'>Change Aavtar</Button> */}
            </div>
              {
                loggedInUser?.id === userId && (
                  <Button onClick={onOpen} padding='1.3rem' colorScheme='purple' marginLeft='auto'>Change Aavtar</Button> 
                )
              }
              <EditProfile isOpen={isOpen} onClose={onClose}/>
          </div>
        </>
      )}

      <div className="w-full p-5 flex flex-col gap-3 justify-center items-start">
        {postsLoading ? (
          <Spinner color="purple" />
        ) : (
          <>
            {posts.map((post) => (
              <Post key={posts?.postId} post={post} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
