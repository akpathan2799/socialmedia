import { Avatar, Code } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function User({user}) {
  const {username,id,avatar} = user;
  return (
    <div className='flex justify-center items-center w-full flex-row'>
      <div className='  w-[160px] p-2 bg-[#e7e6e6] gap-2 flex flex-col justify-center rounded items-center' >

        <Avatar size='xl' name={username} src={avatar}/>

        <Code>@{username}</Code>

        <Link className=' underline text-purple-600 font-bold' to={`/protected/profile/${id}`}>View Profile</Link>



      </div>
    </div>
  );
}

export default User;
