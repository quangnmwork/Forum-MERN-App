import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NavigationSearch from "./NavigationSearch";
import NavigationButton from "./NavigationButton";
import NavigationButtonResponsive from "./NavigationButtonResponsive";
import NavigationIcon from "./NavigationIcon";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/user/userSlice";

const Navigation = () => {
  const user = useSelector(state => state.user);
  console.log("State user", user.isLogin);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        const getCurrentUser = async () => await dispatch(getUserProfile());
        console.log(currentUser);
        getCurrentUser().then(res => {
          if (res.payload) {
            setCurrentUser(res.payload.data);
          }
        });
      }
    } catch (err) {}
  }, []);
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
        <NavigationButton currentUser={currentUser} />
        <NavigationIcon onClick={showButtonIconHandler} />
      </Flex>
      <NavigationButtonResponsive />
    </Box>
  );
};

export default Navigation;
