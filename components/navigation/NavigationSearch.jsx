import React, { Fragment } from "react";
import { InputGroup, Input, InputRightAddon, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const NavigationSearch = props => {
  return (
    <Box display={props.display}>
      <InputGroup>
        <Input
          focusBorderColor="cyan.300"
          placeholder="Tìm kiếm chủ đề"
          width={{ lg: "4xl", md: "2xl", base: "xl" }}
          minH={{ base: "20px", md: "40px" }}
          fontSize={{ base: "xl", md: "3xl" }}
        ></Input>
        <InputRightAddon type="text" minH={{ base: "20px", md: "40px" }} fontSize={{ base: "xl", md: "3xl" }}>
          <Search2Icon />
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
};

export default NavigationSearch;
