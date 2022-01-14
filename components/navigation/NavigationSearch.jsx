import React, { useRef } from "react";
import { InputGroup, Input, InputRightAddon, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Router from "next/router";
const NavigationSearch = props => {
  const searchRef = useRef("");
  return (
    <Box display={props.display}>
      <InputGroup>
        <Input
          focusBorderColor="cyan.300"
          placeholder="Tìm kiếm chủ đề"
          width={{ lg: "4xl", md: "2xl", base: "xl" }}
          minH={{ base: "20px", md: "40px" }}
          ref={searchRef}
          fontSize={{ base: "xl", md: "3xl" }}
        ></Input>
        <InputRightAddon
          type="text"
          minH={{ base: "20px", md: "40px" }}
          fontSize={{ base: "xl", md: "3xl" }}
          onClick={() => {
            Router.push({
              pathname: "/search",
              query: { "title[regex]": searchRef.current.value, "title[options]": "i" },
            });
          }}
        >
          <Search2Icon />
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
};

export default NavigationSearch;
