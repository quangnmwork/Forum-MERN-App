import React from "react";
import { Box } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
const NavigationIcon = props => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={props.onClick}>
      {props.isShow ? <Icon as={AiOutlineClose} minW={10} minH={10} /> : <Icon as={FaBars} minW={10} minH={10} />}
    </Box>
  );
};

export default NavigationIcon;