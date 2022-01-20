import { Box } from "@chakra-ui/react";
import React, { Fragment } from "react";
import Head from "next/head";
import FormForgotPassword from "./../../components/form-forgot/FormForgotPassword";
const forgotPassword = () => {
  return (
    <Fragment>
      <Head>
        <title>Quên mật khẩu</title>
        <meta name="description" content="QM Forum quên mật khẩu" />
      </Head>
      <Box h={"100vh"} bgColor={"green.50"}>
        <FormForgotPassword />
      </Box>
    </Fragment>
  );
};

export default forgotPassword;
