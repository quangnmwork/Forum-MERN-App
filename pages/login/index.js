import { Box } from "@chakra-ui/react";
import React from "react";
import FormLogin from "./../../components/form-login/FormLogin";

const login = () => {
  return (
    <Box h={"100vh"} bgColor={"green.50"}>
      <FormLogin />
    </Box>
  );
};

export default login;
