import React from "react";
import { FormControl, FormLabel, Input, Box, Text, Image, Flex, Button, FormErrorMessage } from "@chakra-ui/react";
import { useState, useRef } from "react";
import AbsCenter from "../layout/absCenter";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import FormBrand from "../form-utils/FormBrand";
import Router from "next/router";
const userRespository = RepositoryFactory.get("users");

const FormResetPassword = () => {
  const [submitErr, setSubmitErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const passwordInput = useRef("");
  const codeInput = useRef("");
  const passwordConfirmInput = useRef("");
  const submitResetHandler = async e => {
    try {
      e.preventDefault();
      const password = passwordInput.current.value;
      const resetToken = codeInput.current.value;
      const passwordConfirm = passwordConfirmInput.current.value;
      console.log(resetToken, password, passwordConfirm);
      if (!password.trim() || !resetToken.trim() || !passwordConfirm.trim()) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      } else if (password.length < 6) {
        throw new Error("Mật khẩu có độ dài ít nhất là 6");
      } else if (password != passwordConfirm) {
        throw new Error("Mật khẩu xác nhận không khớp");
      }
      setIsLoading(true);
      const res = await userRespository.resetPassword({ resetToken, password, passwordConfirm });
      if (res.status == 200) {
        setErrMessage("Đổi mật khẩu thành công");
        setSubmitErr(false);
        setTimeout(() => {
          Router.replace("/");
        }, 2000);
      }
      console.log(res);
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
          <FormControl isInvalid={submitErr == true ? true : false}>
            <FormControl isRequired>
              <FormLabel fontSize={"2xl"} htmlFor="name">
                Code
              </FormLabel>
              <Input
                isRequired={true}
                id="name"
                type="email"
                fontSize={"2xl"}
                py={"8"}
                px={"5"}
                onChange={() => {
                  setSubmitErr(false);
                  setErrMessage("");
                }}
                ref={codeInput}
              />
            </FormControl>
            <FormControl mt={"8"} isRequired>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel fontSize={"2xl"} htmlFor="password">
                  Mật khẩu mới
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
                  Xác nhận mật khẩu mới
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
                onClick={submitResetHandler}
              >
                Xác nhận
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

export default FormResetPassword;
