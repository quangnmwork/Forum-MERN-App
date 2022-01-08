import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { Fragment } from "react";
import FormLogin from "./../../components/form-login/FormLogin";

const login = () => {
  return (
    <Fragment>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="QM Forum Đăng nhập" />
      </Head>
      <Box h={"100vh"} bgColor={"green.50"}>
        <FormLogin />
      </Box>
    </Fragment>
  );
};

export default login;
