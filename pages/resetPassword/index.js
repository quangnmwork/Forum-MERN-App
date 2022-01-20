import React, { Fragment } from "react";
import FormResetPassword from "./../../components/form-reset/FormResetPassword";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

const resetPassword = () => {
  return (
    <Fragment>
      <Head>
        <title>Xác nhận mật khẩu</title>
        <meta name="description" content="QM Forum quên mật khẩu" />
      </Head>
      <Box h={"100vh"} bgColor={"green.50"}>
        <FormResetPassword />
      </Box>
      );
    </Fragment>
  );
};

export default resetPassword;
