import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Box,
  Text,
  Image,
  Flex,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import AbsCenter from "../layout/absCenter";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import Router from "next/router";
import FormBrand from "../form-utils/FormBrand";
const userRespository = RepositoryFactory.get("users");

const FormForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInput = useRef("");
  const sendResetPasswordHandler = async e => {
    try {
      e.preventDefault();
      const email = emailInput.current.value;
      setIsLoading(true);
      await userRespository.forgotPassword({ email });
      setIsLoading(false);
      Router.replace("/resetPassword");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box width={"full"} height={"full"} position={"relative"}>
      <AbsCenter top={"50%"}>
        <Box w={{ base: "2xl", md: "3xl" }}>
          <FormBrand />
        </Box>
        <FormControl
          shadow={"lg"}
          borderWidth={"1px"}
          borderStyle={"solid"}
          px={"10"}
          py={"14"}
          mt={"12"}
          bgColor={"white"}
          rounded={"md"}
        >
          <FormControl>
            <FormControl isRequired>
              <Text fontSize={"2xl"} fontWeight={"bold"} mb={"3"}>
                Nhập email của bạn ở dưới để nhận mã của bạn
              </Text>
              <Input
                isRequired={true}
                id="email"
                type="email"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                placeholder="you@example.com"
                ref={emailInput}
              />
            </FormControl>
            <Box mt={"8"}>
              <Button
                isLoading={isLoading}
                type="submit"
                variant="solid"
                colorScheme="cyan"
                width="full"
                fontSize={"2xl"}
                color={"white"}
                py={"8"}
                onClick={sendResetPasswordHandler}
              >
                Gửi
              </Button>
            </Box>
          </FormControl>
        </FormControl>
      </AbsCenter>
    </Box>
  );
};

export default FormForgotPassword;
