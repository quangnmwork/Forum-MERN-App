import React, { useEffect, useRef } from "react";
import Sidebar from "../sidebar/SideBar";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Textarea,
  Text,
  Avatar,
  Icon,
  Circle,
  Skeleton,
} from "@chakra-ui/react";

import { BsCameraFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./../../redux/user/userSlice";
import { useSelector } from "react-redux";
const FormProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const aboutMeInput = useRef(currentUser.aboutMe || "");
  const contactLinkInput = useRef(currentUser.contactLink || "");
  const phoneNumberInput = useRef(currentUser.phoneNumber || "");
  const nameInput = useRef(currentUser.name);
  const avatarInput = useRef(currentUser.avatar || "");
  console.log("profile", currentUser);
  const submitUpdateProfileHandler = e => {
    e.preventDefault();
    const aboutMe = aboutMeInput.current.value;
    const contactLink = contactLinkInput.current.value;
    const phoneNumber = phoneNumberInput.current.value;
    const name = nameInput.current.value;
    const avatar = avatarInput.current.value;
  };
  useEffect(() => {
    try {
      const getCurrentUser = async () => await dispatch(getUserProfile());
      getCurrentUser();
    } catch (err) {}
  }, []);
  return (
    <Flex h={"100%"}>
      <Sidebar />
      <Box w={"25%"} ml={"20"} mt={10}>
        <FormControl>
          <Flex direction={"column"} experimental_spaceY={"5"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Thông tin của bạn
            </Text>
            <Flex justifyContent={"center"}>
              <Box position={"relative"}>
                <Avatar
                  src={
                    currentUser.avatar ||
                    "https://res.cloudinary.com/dsyigmpux/image/upload/v1640765880/ferj1kzaesrzmv0ulfoz.png"
                  }
                  size={"2xl"}
                  borderWidth={"2px"}
                  borderColor={"cyan.500"}
                ></Avatar>

                <FormLabel htmlFor="avatar">
                  <Circle position={"absolute"} bottom={"0"} right={"0"} bgColor={"cyan.500"} p={"3"}>
                    <Icon as={BsCameraFill} w={"7"} h={"7"} color={"white"}></Icon>
                  </Circle>
                </FormLabel>
              </Box>
              <Input id="avatar" type={"file"} display={"none"}></Input>
            </Flex>
            <FormControl isRequired>
              <FormLabel htmlFor="name" fontSize={"2xl"}>
                Tên của bạn
              </FormLabel>
              <Skeleton isLoaded={currentUser.name}>
                <Input id="name" type="text" p={"5"} fontSize={"2xl"} value={currentUser.name} />
              </Skeleton>
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel htmlFor="email" fontSize={"2xl"}>
                Email
              </FormLabel>
              <Input id="email" type="text" p={"5"} fontSize={"2xl"} value={currentUser.email} isDisabled />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="intro" fontSize={"2xl"}>
                Giới thiệu bản thân
              </FormLabel>
              <Textarea
                id="intro"
                type="text"
                p={"5"}
                fontSize={"2xl"}
                placeholder="Giới thiệu bản thân  của bạn"
                value={currentUser.aboutMe || ""}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="contact" fontSize={"2xl"}>
                Liên hệ
              </FormLabel>
              <Input
                id="contact"
                type="text"
                p={"5"}
                fontSize={"2xl"}
                placeholder="Tùy chọn"
                value={currentUser.contactlink || ""}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone" fontSize={"2xl"}>
                Số điện thoại
              </FormLabel>
              <Input
                id="phone"
                type="number"
                p={"5"}
                placeholder="Tùy chọn"
                fontSize={"2xl"}
                value={currentUser.phoneNumber || ""}
              />
            </FormControl>
            <Button mt={4} type="submit" variant="solid" colorScheme="cyan" fontSize={"2xl"} color={"white"} py={"8"}>
              Lưu & Thay đổi
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default FormProfile;
