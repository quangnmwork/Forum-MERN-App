import React from "react";
import { Box } from "@chakra-ui/react";
import FormSignUp from "../../components/form-signup/FormSignUp";
const SignUp = () => {
  return (
    <Box h={{ base: "150vh", xl: "100vh" }} bgColor={"green.50"}>
      <FormSignUp />
    </Box>
  );
};

export default SignUp;
