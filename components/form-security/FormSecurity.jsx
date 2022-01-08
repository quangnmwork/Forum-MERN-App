import { Box, FormControl, FormLabel, Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import SideBar from "../sidebar/SideBar";
import withAuth from "../HOC/withAuth";
import { useDispatch } from "react-redux";
import { updatePassword } from "./../../redux/user/userSlice";

const FormSecurity = () => {
  const [submitErr, setSubmitErr] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const passwordCurrentInput = useRef("");
  const passwordInput = useRef("");
  const passwordConfirmInput = useRef("");
  const changePasswordSubmitHandler = async e => {
    try {
      e.preventDefault();
      const passwordCurrent = passwordCurrentInput.current.value;
      const password = passwordInput.current.value;
      const passwordConfirm = passwordConfirmInput.current.value;
      if (!password.length || !passwordCurrent.length || !passwordConfirm.length) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      } else if (password != passwordConfirm) {
        throw new Error("Mật khẩu xác nhận không đúng");
      } else if (password.length < 6) {
        throw new Error("Mật khẩu phải có độ dài ít nhất là 6");
      }
      setIsLoading(true);
      const res = await dispatch(updatePassword({ passwordCurrent, password, passwordConfirm }));
      setIsLoading(false);
      if (res.payload != undefined) {
        setSubmitErr(false);
        setSubmitMessage("Cập nhật mật khẩu thành công");
      } else {
        throw new Error("Mật khẩu hiện tại không đúng");
      }
    } catch (err) {
      setIsLoading(false);
      setSubmitErr(true);
      setSubmitMessage(err.message);
    }
  };
  const inputOnchange = () => {
    setSubmitErr(false);
    setSubmitMessage("");
  };

  return (
    <Flex>
      <SideBar />
      <Box w={"30%"} ml={"20"} mt={10}>
        <FormControl>
          <Flex direction={"column"} experimental_spaceY={"5"}>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"currentPassword"}>
                Mật khẩu hiện tại
              </FormLabel>
              <Input
                id="currentPassword"
                type="password"
                p={"5"}
                fontSize={"2xl"}
                ref={passwordCurrentInput}
                onChange={inputOnchange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"newPassword"}>
                Mật khẩu mới
              </FormLabel>
              <Input
                id="newPassword"
                type="password"
                p={"5"}
                fontSize={"2xl"}
                ref={passwordInput}
                onChange={inputOnchange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"newPasswordConfirm"}>
                Xác nhận mật khẩu mới
              </FormLabel>
              <Input
                id="newPasswordConfirm"
                type="password"
                p={"5"}
                fontSize={"2xl"}
                ref={passwordConfirmInput}
                onChange={inputOnchange}
              />
            </FormControl>
            <Text fontSize={"2xl"} my={"3"} color={submitErr ? "red" : "green"}>
              {submitMessage}
            </Text>
            <Button
              mt={4}
              type="submit"
              variant="solid"
              colorScheme="cyan"
              fontSize={"2xl"}
              color={"white"}
              py={"8"}
              isLoading={isLoading}
              onClick={changePasswordSubmitHandler}
            >
              Đổi mật khẩu
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default withAuth(FormSecurity);
