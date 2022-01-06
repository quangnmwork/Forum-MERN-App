import { Box, FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import React from "react";
import SideBar from "../sidebar/SideBar";

const FormSecurity = () => {
  return (
    <Flex>
      <SideBar />
      <Box w={"20%"} ml={"20"} mt={10}>
        <FormControl>
          <Flex direction={"column"} experimental_spaceY={"5"}>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"currentPassword"}>
                Mật khẩu hiện tại
              </FormLabel>
              <Input id="currentPassword" type="password" p={"5"} fontSize={"2xl"} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"newPassword"}>
                Mật khẩu mới
              </FormLabel>
              <Input id="newPassword" type="password" p={"5"} fontSize={"2xl"} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="current" fontSize={"2xl"} htmlFor={"newPasswordConfirm"}>
                Xác nhận mật khẩu mới
              </FormLabel>
              <Input id="newPasswordConfirm" type="password" p={"5"} fontSize={"2xl"} />
            </FormControl>
            <Button mt={4} type="submit" variant="solid" colorScheme="cyan" fontSize={"2xl"} color={"white"} py={"8"}>
              Đổi mật khẩu
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default FormSecurity;
