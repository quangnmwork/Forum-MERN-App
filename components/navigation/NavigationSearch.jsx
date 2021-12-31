import React, { Fragment } from "react";
import { InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const NavigationSearch = () => {
  return (
    <Fragment>
      <InputGroup>
        <Input
          focusBorderColor="cyan.300"
          placeholder="Tìm kiếm chủ đề"
          width={{ lg: "5xl", md: "4xl" }}
          minH={"40px"}
          fontSize={"3xl"}
        ></Input>
        <InputRightAddon type="text" minH={"40px"} fontSize={"3xl"}>
          <Search2Icon />
        </InputRightAddon>
      </InputGroup>
    </Fragment>
  );
};

export default NavigationSearch;
