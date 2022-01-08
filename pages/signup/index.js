import React, { Fragment } from "react";
import { Box } from "@chakra-ui/react";
import FormSignUp from "../../components/form-signup/FormSignUp";
import Head from "next/head";
const SignUp = () => {
  return (
    <Fragment>
      <Head>
        <title>Đăng kí</title>
        <meta name="description" content="QM Forum Đăng kí" />
      </Head>
      <Box h={"100vh"} bgColor={"green.50"}>
        <FormSignUp />
      </Box>
    </Fragment>
  );
};

export default SignUp;
