import React, { useState } from "react";
import { Center, useStatStyles } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useLogin } from "../../hooks/login hook/useLogin";
// import { Link } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  const formData = (data) => {
     login({
      email:data.email,
      password:data.password
    })


    
  };

  const {loading,login} = useLogin();

  return (
    <Center h="100vh" color="white">
      <Box
        maxW="sm"
        minW="200px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        textColor="black"
        p="1rem"
      >
        <Text fontSize="xl" fontWeight="700" textAlign="center">
          Log In
        </Text>
        <form onSubmit={handleSubmit(formData)}>
          <div className=" mt-1 mb-1">
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter Email Address"
              />

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </div>
          <div className="mb-1 mt-1">
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                type="password"
                placeholder="Enter Password"
              />

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </div>
          <Button
            type="submit"
            colorScheme="purple"
            size="md"
            w="100%"
            m="5px 0 5px 0"
            isLoading={loading}
            loadingText="Logging In"
          >
            Login
          </Button>
          <Text fontSize="xlg" align="center" mt="6">
            Don't have an account?{" "}
            <Link
              to="/signup"
            
              className=" text-purple-600 text-md underline font-semibold "
             
             
              
            >
              Register
            </Link>{" "}
            instead!
          </Text>
        </form>
      </Box>
    </Center>
  );
}

export default Login;


