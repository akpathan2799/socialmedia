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
import { useSignUp } from "../../hooks/signup hook/useSignUp";
function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {signUp , loading}  = useSignUp();
  const formData = (data) => {
  

    const result = signUp({...data})

    if(result){
      reset()
    }

 
    

    

  
  };


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
          Sign Up
        </Text>
        <form onSubmit={handleSubmit(formData)}>
          <div className=" mt-1 mb-1">
            <FormControl isInvalid={errors.email}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("username", {
                  required: {
                    value: true,
                    message: "Please enter username",
                  },
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Username must be alphanumeric",
                  },
                })}
                type="text"
                placeholder="Enter Username "
              />

              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
          </div>
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
            loadingText="Signing Up"
          >
            Sign Up
          </Button>
          <Text fontSize="xlg" align="center" mt="6">
            Already have an account {'!  '}
            <Link
              to="/"
              className=" text-purple-600 text-md underline font-semibold "
            >
              Log In
            </Link>{" "}
            instead
          </Text>
        </form>
      </Box>
    </Center>
  );
}

export default SignUp;
