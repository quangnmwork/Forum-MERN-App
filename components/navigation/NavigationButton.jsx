import { Box, Button, Text, Flex } from "@chakra-ui/react";
import Router from "next/router";
const NavigationButton = () => {
  return (
    <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
      <Box mr={"7"}>
        <Button colorScheme="cyan" variant={"outline"} py={"7"} px={"5"}>
          <Text
            fontSize={{ md: "2xl", lg: "3xl" }}
            fontStyle={"normal"}
            onClick={() => {
              Router.push("/signup");
            }}
          >
            Đăng kí
          </Text>
        </Button>
      </Box>
      <Box>
        <Button colorScheme="cyan" variant={"solid"} py={"8"} px={"5"}>
          <Text
            fontSize={{ md: "2xl", lg: "3xl" }}
            fontStyle={"normal"}
            color="white"
            onClick={() => {
              Router.push("/login");
            }}
          >
            Đăng nhập
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default NavigationButton;
