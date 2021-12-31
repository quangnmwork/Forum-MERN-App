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
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import AbsCenter from "../layout/absCenter";
import { RepositoryFactory } from "./../../api-factory/repositoryFactory";
import Router from "next/router";

const userRespository = RepositoryFactory.get("users");

const FormLogin = () => {
  const [submitErr, setSubmitErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInput = useRef("");
  const passwordInput = useRef("");
  const submitLoginHandler = async e => {
    try {
      e.preventDefault();
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      setIsLoading(true);
      const res = await userRespository.login({ email, password });
      setIsLoading(false);
    } catch (err) {
      setSubmitErr(true);
      setIsLoading(false);
    }
  };

  return (
    <Box width={"full"} height={"full"} position={"relative"}>
      <AbsCenter top={"50%"}>
        <Box w={{ base: "2xl", md: "3xl" }}>
          <Flex justifyContent={"center"} alignItems={"center"} direction={"column"} gap={"10"}>
            <Flex alignItems={"center"} gap={"5"}>
              <Image boxSize="50px" objectFit="cover" src="/static/logo.svg" alt="logo" />
              <Text fontWeight={"bold"} fontSize={"4xl"} color={"cyan.500"}>
                MQ Forum
              </Text>
            </Flex>
            <Text fontWeight={"bold"} fontSize={"4xl"}>
              Đăng nhập vào tài khoản của bạn
            </Text>
            <HStack fontSize={"2xl"} fontWeight={"bold"}>
              <Text>Chưa có tài khoản?</Text>
              <Text
                color={"cyan.500"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  Router.replace("/signup");
                }}
              >
                Đăng kí ngay
              </Text>
            </HStack>
          </Flex>
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
          <FormControl isInvalid={submitErr == true ? true : false}>
            <FormControl isRequired>
              <FormLabel fontSize={"2xl"} htmlFor="email">
                Email
              </FormLabel>
              <Input
                isRequired={true}
                id="email"
                type="email"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                placeholder="you@example.com"
                ref={emailInput}
                onChange={() => {
                  setSubmitErr(false);
                }}
              />
              {/* <FormErrorMessage fontSize={"2xl"}>{emailErr}</FormErrorMessage> */}
            </FormControl>
            <FormControl mt={"8"} isRequired>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel fontSize={"2xl"} htmlFor="password">
                  Mật khẩu
                </FormLabel>
                <Text fontSize={"2xl"} color={"cyan.400"} cursor={"pointer"}>
                  Quên mật khẩu?
                </Text>
              </Flex>
              <Input
                isRequired={true}
                id="password"
                type="password"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                placeholder="Mật khẩu"
                ref={passwordInput}
                onChange={() => {
                  setSubmitErr(false);
                }}
              />
              {/* <FormErrorMessage fontSize={"2xl"}>{passwordErr}</FormErrorMessage> */}
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
                onClick={submitLoginHandler}
              >
                Đăng nhập
              </Button>
            </Box>
            <FormErrorMessage display={"flex"} justifyContent={"center"} fontSize={"2xl"}>
              Tài khoản mật khẩu không đúng
            </FormErrorMessage>
          </FormControl>
          <Box
            mt={"8"}
            display={"flex"}
            flexGrow={"1"}
            flexShrink={"1"}
            flexBasis={"0%"}
            alignItems={"center"}
            gap={"3"}
          >
            <Box h={"1px"} w={"full"} bgColor={"gray.200"} />
            <Box w={"full"}>
              <Text color={"gray.400"} fontSize={"xl"} whiteSpace={"nowrap"}>
                Hoặc đăng nhập bằng
              </Text>
            </Box>
            <Box h={"1px"} w={"full"} bgColor={"gray.200"} />
          </Box>
          <Box
            mt={"8"}
            display={"flex"}
            flexGrow={"1"}
            flexShrink={"1"}
            flexBasis={"0%"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"3"}
          >
            <Button px={"10"} py={"7"} fontSize={"xl"} textAlign={"center"}>
              <FaFacebook />
            </Button>
            <Button px={"10"} py={"7"} fontSize={"xl"}>
              <FaTwitter />
            </Button>
            <Button px={"10"} py={"7"} fontSize={"xl"}>
              <FaGithub />
            </Button>
          </Box>
        </FormControl>
      </AbsCenter>
    </Box>
  );
};

export default FormLogin;
