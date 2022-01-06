import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList, Slide } from "@chakra-ui/react";

const NavItem = ({ icon, title, active, navSize, onClick }) => {
  return (
    <Flex mt={5} flexDir="column" w="100%" alignItems={navSize == "small" ? "center" : "flex-start"}>
      <Menu placement="right">
        <Link
          bgColor={active && "cyan.500"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "cyan.600" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%" onClick={onClick}>
            <Flex alignItems={"center"} textColor={"white"}>
              <Icon as={icon} color={active ? "gray.500" : "gray.500"} fontSize={"2xl"} textColor={"white"} />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"} fontSize={"2xl"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
export default NavItem;
