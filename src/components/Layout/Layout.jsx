import React, { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../hooks/auth hook/useAuth";
import SideBar from "../SIdeBar/SideBar";
// import { authStatus } from "../../hooks/authentication status Hook/authStatus";

function Layout() {
  const { pathname } = useLocation();
const {user , loading , error} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && pathname.startsWith("/protected") && !user) {
      navigate("/");
    }
  }, [pathname, user, loading]);

  if (loading) {
    return<> <div className="w-full h-[100vh] flex justify-center items-center">
      <Spinner size="xl" color="purple.500" />
    </div></>;
  }else{
  return (
    <>
      <div className=" bg-white">
        <Navbar />
      </div>
      <div className=" max-w-[1300px] pt-16  m-auto flex max-[500px]:flex-wrap-reverse">
        
        <Outlet />
        <SideBar/>
      </div>
    </>
  );
}
}

export default Layout;
