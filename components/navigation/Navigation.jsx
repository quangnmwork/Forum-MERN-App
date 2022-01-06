import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationButton from "./NavigationButton";
import NavigationButtonResponsive from "./NavigationButtonResponsive";
import NavigationIcon from "./NavigationIcon";
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
  const user = useSelector(state => state.user);
  console.log("State user", user.isLogin);

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

        <Box>
          <NavigationSearch />
        </Box>
        <NavigationButton />
        <NavigationIcon onClick={showButtonIconHandler} />
      </Flex>
      <NavigationButtonResponsive />
    </Box>
  );
};

export default Navigation;
