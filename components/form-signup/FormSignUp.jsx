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
import { RepositoryFactory } from "./../../api-factory/repositoryFactory";
import Router from "next/router";

const userRespository = RepositoryFactory.get("users");

const FormSignUp = () => {
  const [submitErr, setSubmitErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const emailInput = useRef("");
  const passwordInput = useRef("");
  const nameInput = useRef("");
  const passwordConfirmInput = useRef("");
  const submitLoginHandler = async e => {
    try {
      e.preventDefault();
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      const name = nameInput.current.value;
      const passwordConfirm = passwordConfirmInput.current.value;
      console.log(email, password, name, passwordConfirm);
      if (!email || !password || !name || !passwordConfirm) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      } else if (!email.includes("@")) {
        throw new Error("Email không hợp lệ");
      } else if (password.length < 6) {
        throw new Error("Mật khẩu có độ dài ít nhất là 6");
      } else if (password != passwordConfirm) {
        throw new Error("Mật khẩu xác nhận không khớp");
      }
      setIsLoading(true);
      const res = await userRespository.signup({ name, email, password, passwordConfirm });
      if (res.status == 201) {
        setErrMessage(res.data.message);
        setSubmitErr(false);
      }
      setIsLoading(false);
    } catch (err) {
      setSubmitErr(true);
      // console.log(err.response);
      if (err.response != undefined) {
        if (err.response.status == 400) setErrMessage(err.response.data.message);
      } else if (err.response == null) {
        setErrMessage(err.message);
      }

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
              Đăng kí tài khoản của bạn
            </Text>
            <HStack fontSize={"2xl"} fontWeight={"bold"}>
              <Text>Đã có tài khoản?</Text>
              <Text
                color={"cyan.500"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  Router.replace("/login");
                }}
              >
                Đăng nhập ngay
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
              <FormLabel fontSize={"2xl"} htmlFor="name">
                Tên người dùng
              </FormLabel>
              <Input
                isRequired={true}
                id="name"
                type="email"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                placeholder="Nguyễn Văn A"
                onChange={() => {
                  setSubmitErr(false);
                  setErrMessage("");
                }}
                ref={nameInput}
              />
            </FormControl>
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
                  setErrMessage("");
                }}
              />
            </FormControl>
            <FormControl mt={"8"} isRequired>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel fontSize={"2xl"} htmlFor="password">
                  Mật khẩu
                </FormLabel>
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
                  setErrMessage("");
                }}
              />
            </FormControl>
            <FormControl mt={"8"} isRequired>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel fontSize={"2xl"} htmlFor="passwordConfirm">
                  Xác nhận mật khẩu
                </FormLabel>
              </Flex>
              <Input
                isRequired={true}
                id="passwordConfirm"
                type="password"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                placeholder="Mật khẩu"
                ref={passwordConfirmInput}
                onChange={() => {
                  setSubmitErr(false);
                  setErrMessage("");
                }}
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
                onClick={submitLoginHandler}
              >
                Đăng kí
              </Button>
            </Box>
            <Text
              display={"flex"}
              justifyContent={"center"}
              fontSize={"2xl"}
              color={submitErr == false && errMessage.length > 0 ? "green" : "red"}
            >
              {errMessage}
            </Text>
          </FormControl>
        </FormControl>
      </AbsCenter>
    </Box>
  );
};

export default FormSignUp;
