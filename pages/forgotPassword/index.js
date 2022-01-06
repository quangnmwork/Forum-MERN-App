import { Box } from "@chakra-ui/react";
import React from "react";
import FormForgotPassword from "./../../components/form-forgot/FormForgotPassword";
const forgotPassword = () => {
  return (
    <Box h={"100vh"} bgColor={"green.50"}>
      <FormForgotPassword />
    </Box>
  );
};

export default forgotPassword;
