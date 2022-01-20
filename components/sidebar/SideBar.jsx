import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiHome } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import NavItem from "./NavItem";
import Router from "next/router";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
export default function Sidebar({ column }) {
  const [navSize, changeNavSize] = useState("large");
  const { currentUser } = useSelector(state => state.user);
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
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
        transition={"all 0.5s ease-in-out"}
      >
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
        {currentUser.role == "admin" && (
          <NavItem
            navSize={navSize}
            icon={AiOutlineComment}
            title="Quản lý bình luận"
            onClick={() => {
              Router.replace("/userProfile/comments");
            }}
          />
        )}
        {currentUser.role == "admin" && (
          <NavItem
            navSize={navSize}
            icon={BiUser}
            title="Người dùng"
            onClick={() => {
              Router.replace("/userProfile/users");
            }}
          />
        )}
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
