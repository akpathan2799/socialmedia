import React, { useEffect } from 'react';
import { useGetAllUserInfo } from '../../hooks/getAllUserInfo hook/useGetAllUserInfo';
import { Spinner } from '@chakra-ui/react';
// import { logDOM } from '@testing-library/react';
import User from '../user/user';

function Users() {

  const { allUsers, allUserLoading } = useGetAllUserInfo()

  useEffect(() => {
  }, [])


  return (
    <div className='w-full min-h-screen flex justify-start items-start gap-2 p-4 max-[500px]:flex-wrap :'>
     {allUserLoading ? (
        <Spinner color='purple' />
      ) : (
        allUsers && allUsers.length > 0 ? (
          allUsers.map((user) => (
            <User key={user.id} user={user} />
          ))
        ) : (
          <Spinner color='purple'/>
        )
      )}
    </div>
  );
}

export default Users;
