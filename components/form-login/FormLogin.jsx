import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Box,
  Text,
  Flex,
  Button,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import AbsCenter from "../layout/absCenter";
import withAuth from "../HOC/withAuth";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { login, getUserProfile } from "../../redux/user/userSlice";
import FormBrand from "../form-utils/FormBrand";

const FormLogin = () => {
  const [submitErr, setSubmitErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInput = useRef("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const passwordInput = useRef("");
  const submitLoginHandler = async e => {
    try {
      e.preventDefault();
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      setIsLoading(true);
      if (!email || !password) throw new Error("Tài khoản mật khẩu không được trống");
      const res = await dispatch(login({ email, password }));
      if (res.error) {
        throw new Error(res.error.message);
      }
      setIsLoading(false);
      Router.replace("/");
    } catch (err) {
      console.log(err);
      setSubmitErr(true);
      setIsLoading(false);
    }
  };

  return (
    <Box width={"full"} height={"full"} position={"relative"}>
      <AbsCenter top={"50%"}>
        <Box w={{ base: "2xl", md: "3xl" }}>
          <Flex justifyContent={"center"} alignItems={"center"} direction={"column"} gap={"10"}>
            <FormBrand />
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
                <Text
                  fontSize={"2xl"}
                  color={"cyan.400"}
                  cursor={"pointer"}
                  onClick={() => {
                    Router.replace("/forgotPassword");
                  }}
                >
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
            <Button px={"10"} py={"7"} fontSize={"xl"} textAlign={"center"} onClick={onOpen}>
              <FaFacebook />
            </Button>
            <Button px={"10"} py={"7"} fontSize={"xl"} onClick={onOpen}>
              <FaTwitter />
            </Button>
            <Button px={"10"} py={"7"} fontSize={"xl"} onClick={onOpen}>
              <FaGithub />
            </Button>
          </Box>
        </FormControl>
      </AbsCenter>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"2xl"}>Tính năng này chưa được thêm</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="cyan" variant={"outline"} onClick={onClose} fontSize={"2xl"}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default withAuth(FormLogin);
