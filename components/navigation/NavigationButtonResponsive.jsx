import React, { Fragment } from "react";

import { Flex, Box, Text } from "@chakra-ui/react";
import Router from "next/router";
import { useSelector } from "react-redux";
const NavigationButtonResponsive = props => {
  const user = useSelector(state => state.user);
  console.log(user);
  return (
    <Box display={user.isLogin ? "none" : "block"}>
      <Box display={{ base: "block", md: "none" }}>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          shadow={"md"}
          fontSize={"2xl"}
          display={props.isShow ? "flex" : "none"}
        >
          <Box borderBottom={"1px"} borderStyle={"solid"} borderColor={"gray.300"}>
            <Text
              py={"4"}
              textAlign={"center"}
              onClick={() => {
                Router.push("/login");
              }}
            >
              Đăng nhập
            </Text>
          </Box>
          <Box>
            <Text
              py={"4"}
              textAlign={"center"}
              onClick={() => {
                Router.push("/signup");
              }}
            >
              Đăng kí
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default NavigationButtonResponsive;
