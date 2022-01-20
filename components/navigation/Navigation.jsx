import { Box, Flex, Image, Text, Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationButton from "./NavigationButton";
import NavigationButtonResponsive from "./NavigationButtonResponsive";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/user/userSlice";
import NavigationAvatar from "./NavigationAvatar";
import Router from "next/router";
import { AddIcon } from "@chakra-ui/icons";
const Navigation = () => {
  const user = useSelector(state => state.user);
  // console.log("State user", user.isLogin);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        const getCurrentUser = async () => await dispatch(getUserProfile());

        getCurrentUser().then(res => {
          if (res.payload) {
            setCurrentUser(res.payload);
          }
        });
      }
    } catch (err) {}
  }, []);

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
          <Image
            boxSize="50px"
            objectFit="cover"
            src="/static/logo.svg"
            alt="logo"
            cursor={"pointer"}
            onClick={() => {
              Router.replace("/");
            }}
          />
        </Box>
        <NavigationSearch display={{ base: "none", md: "block" }} />
        <NavigationButton />
        <Flex alignItems={"center"} display={user.isLogin ? "flex" : { base: "flex", md: "none" }} gap={"5"}>
          <Button
            size={"xl"}
            fontSize={"2xl"}
            colorScheme={"cyan"}
            px={"5"}
            py={"3"}
            color={"white"}
            display={user.isLogin ? "block" : "none"}
            onClick={() => {
              Router.replace("/createPost");
            }}
          >
            <Flex alignItems={"center"} gap={"5"}>
              <Text>Tạo bài viết</Text>
              <AddIcon />
            </Flex>
          </Button>
          <NavigationAvatar currentUser={currentUser} />
          <NavigationButtonResponsive />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
