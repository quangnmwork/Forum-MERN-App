import React from "react";
import FormResetPassword from "./../../components/form-reset/FormResetPassword";
import { Box } from "@chakra-ui/react";
const resetPassword = () => {
  return (
    <Box h={"100vh"} bgColor={"green.50"}>
      <FormResetPassword />
    </Box>
  );
};

export default resetPassword;
