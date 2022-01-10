import React, { Fragment } from "react";

import {
  Flex,
  Box,
  Text,
  Drawer,
  Input,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Router from "next/router";
import { useSelector } from "react-redux";
import NavigationIcon from "./NavigationIcon";
import NavigationSearch from "./NavigationSearch";
const NavigationButtonResponsive = props => {
  const user = useSelector(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(user);
  return (
    <Box display={{ base: "block", md: "none" }}>
      <Box>
        <NavigationIcon onClick={onOpen} />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>QM Forum</DrawerHeader>
            <DrawerBody>
              <NavigationSearch display={{ base: "block", md: "none" }} />
              <Box display={user.isLogin ? "none" : "block"} fontSize={"2xl"} textAlign={"center"} mt={"3"}>
                <Button
                  colorScheme={"cyan"}
                  px={"5"}
                  py={"3"}
                  color={"white"}
                  onClick={() => {
                    Router.push("/login");
                  }}
                >
                  Đăng nhập
                </Button>
              </Box>
              <Box display={user.isLogin ? "none" : "block"} fontSize={"2xl"} textAlign={"center"} mt={"3"}>
                <Button
                  colorScheme={"cyan"}
                  variant={"outline"}
                  px={"5"}
                  py={"3"}
                  onClick={() => {
                    Router.push("/signup");
                  }}
                >
                  Đăng kí
                </Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavigationButtonResponsive;
