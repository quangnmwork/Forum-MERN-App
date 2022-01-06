import React, { Fragment } from "react";
import Router from "next/router";
import { Flex, Image, Text } from "@chakra-ui/react";
const FormBrand = () => {
  return (
    <Fragment>
      <Flex alignItems={"center"} gap={"5"} onClick={() => Router.replace("/")} cursor={"pointer"}>
        <Image boxSize="50px" objectFit="cover" src="/static/logo.svg" alt="logo" />
        <Text fontWeight={"bold"} fontSize={"4xl"} color={"cyan.500"}>
          MQ Forum
        </Text>
      </Flex>
    </Fragment>
  );
};

export default FormBrand;
