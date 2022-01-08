import { Box } from "@chakra-ui/react";
import React, { Fragment } from "react";
import FormSecurity from "../../components/form-security/FormSecurity";
import Head from "next/head";
const security = () => {
  return (
    <Fragment>
      <Head>
        <title>Bảo mật</title>
        <meta name="description" content="QM Forum Bảo mật" />
      </Head>
      <Box>
        <FormSecurity />
      </Box>
    </Fragment>
  );
};

export default security;
