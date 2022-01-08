import { Box } from "@chakra-ui/react";
import React, { Fragment } from "react";
import FormProfile from "../../components/form-profile/FormProfile";
import Head from "next/head";
const accountSetting = () => {
  return (
    <Fragment>
      <Head>
        <title>Thông tin cá nhân</title>
        <meta name="description" content="QM Forum thông tin cá nhân" />
      </Head>
      <Box>
        <FormProfile />
      </Box>
    </Fragment>
  );
};
export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}

export default accountSetting;
