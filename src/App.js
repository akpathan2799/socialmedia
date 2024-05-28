
import { Provider, useSelector } from 'react-redux';
import Login from './components/Login/Login';
import { ChakraProvider } from '@chakra-ui/react'
import {store} from './store/store'
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Profile from './components/Profile/Profile'
import SignUp from './components/SIgnUp/SignUp';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';

import ErrorPage from './components/ErrorPage/ErrorPage';
import CommentSection from './components/CommentSection/CommentSection';
const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>,
    // errorElement:<ErrorPage/>
  },
  {
    path:'/signup',
    element:<SignUp/>,
    // errorElement:<ErrorPage/>
  },{
    path:'/protected',
    element:<Layout/>,
    // errorElement:<ErrorPage/>, 
    children:[
      {
        path:'/protected/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/protected/allUsers',
        element:<Users/>
      },
      {
        path:'/protected/profile/:userId',
        element:<Profile/>
      },
      {
        path:'/protected/post/:postId',
        element:<CommentSection/>
      }
    ]
  }
])
function App() {
 
  return (
   <>
    <RouterProvider router={router}/>

   </>
  );
}

export default App;
