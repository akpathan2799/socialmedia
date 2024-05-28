import React from 'react';
import { Link ,Button,} from '@chakra-ui/react';
import { Flex} from '@chakra-ui/react'
import { useLogout } from '../../hooks/logout hook/useLogout';
import {Link as ReactRouterLink} from 'react-router-dom'
function Navbar() {

  const {loading,logOut} = useLogout();
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="purple.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="purple" to='/protected/dashboard' as={ReactRouterLink} fontWeight="bold">
          Home
        </Link>
        <Button
          ml="auto"
          colorScheme="purple"
          size="sm"
          isLoading={loading}
          onClick={logOut}
          
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
