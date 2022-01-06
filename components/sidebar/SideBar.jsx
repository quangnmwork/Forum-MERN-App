import React, { useState } from "react";
import { Flex, Text, IconButton, Divider, Avatar, Heading } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiHome } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import NavItem from "./NavItem";
import Router from "next/router";

export default function Sidebar({ column }) {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="relative"
      minH={"100vh"}
      boxShadow={"md"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      bgColor={"cyan.500"}
      justifyContent="space-between"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems={navSize == "small" ? "center" : "flex-start"} as="nav">
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          fontSize={"2xl"}
          icon={<FiMenu />}
          textColor={"white"}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Trang chủ"
          onClick={() => {
            Router.replace("/");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={CgProfile}
          title="Thông tin cá nhân"
          onClick={() => {
            Router.replace("/userProfile/accountSetting");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={RiLockPasswordLine}
          active={column == "security"}
          title="Bảo mật"
          onClick={() => {
            Router.replace("/userProfile/security");
          }}
        />
      </Flex>
    </Flex>
  );
}
