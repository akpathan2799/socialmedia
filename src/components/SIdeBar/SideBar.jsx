import React from "react";
import { useAuth } from "../../hooks/auth hook/useAuth";
import { Code } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
function SideBar() {
  const { user, loading } = useAuth();
  console.log(user);

  return (
    <div className=" w-96 max-h-screen sticky flex flex-col justify-start items-center py-3 px-2 gap-3 border-l border-purple-500 ">
      {!loading ? (
        <>
          <Avatar name={user.username} src={user.avatar} size="lg" />
          <Code>{user.username}</Code>
          <ReactRouterLink
            to={`/protected/profile/${user.id}`}
            className="w-full bg-purple-600 py-2 text-white text-center font-bold hover:pointer-events-auto rounded-md"
          >
            Edit profile
          </ReactRouterLink>
          <div className="w-full border-t-2 border-purple-500"></div>
          <Button
            colorScheme="purple"
            variant="outline"
            className=" mt-4"
            as={ReactRouterLink}
            to="/protected/allUsers"
          >
            All Users
          </Button>
        </>
      ) : (
        <Spinner size="md" color="purple.500" />
      )}
    </div>
  );
}

export default SideBar;
