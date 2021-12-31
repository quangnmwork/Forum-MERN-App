import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationButton from "./NavigationButton";
import NavigationButtonResponsive from "./NavigationButtonResponsive";
import NavigationIcon from "./NavigationIcon";

const Navigation = () => {
  const [isShow, setIsShow] = useState(false);
  const showButtonIconHandler = () => {
    setIsShow(prevIsShow => !prevIsShow);
  };
  return (
    <Box>
      <Flex
        minH={"50px"}
        borderBottom={"1px"}
        borderStyle={"solid"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"3"}
        px={"5"}
        shadow={"md"}
      >
        <Box>
          <Image boxSize="50px" objectFit="cover" src="/static/logo.svg" alt="logo" />
        </Box>
        {/* <Box display={{ base: "block", md: "none" }}>
          <Text fontSize={"3xl"} color={"cyan.500"} fontWeight={"bold"}>
            QM Forum
          </Text>
        </Box> */}
        <Box>
          <NavigationSearch />
        </Box>
        <NavigationButton />
        <Box display={{ base: "block", md: "none" }} onClick={showButtonIconHandler}>
          <NavigationIcon isShow={isShow} />
        </Box>
      </Flex>
      <NavigationButtonResponsive isShow={isShow} />
    </Box>
  );
};

export default Navigation;
