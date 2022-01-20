import React, { useEffect, useRef, useState } from "react";
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

import withAuth from "../HOC/withAuth";
import { updateProfile } from "./../../redux/user/userSlice";

const FormProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState("");
  const aboutMeInput = useRef(currentUser.aboutMe || "");
  const contactLinkInput = useRef(currentUser.contactLink || "");
  const [submitErr, setSubmitErr] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const phoneNumberInput = useRef(currentUser.phoneNumber || "");
  const nameInput = useRef(currentUser.name);
  const [selectAvatar, setSelectAvatar] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getCurrentUser = async () => await dispatch(getUserProfile());
      getCurrentUser().then(res => {
        if (res.payload) {
          setCurrentUser(res.payload);
          setCurrentAvatar(res.payload.avatar);
        }
      });
    } catch (err) {}
  }, []);

  const checkUser = () => {
    return Object.keys(currentUser).length > 0;
  };
  const submitUpdateProfileHandler = async e => {
    try {
      e.preventDefault();
      const aboutMe = aboutMeInput.current.value;
      const contactLink = contactLinkInput.current.value;
      const phoneNumber = phoneNumberInput.current.value;
      const name = nameInput.current.value;
      if (!name.length) {
        throw new Error("Tên không được trống");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("aboutMe", aboutMe);
      formData.append("contactLink", contactLink);
      formData.append("phoneNumber", phoneNumber);
      formData.append("avatar", selectAvatar);
      setIsSubmitLoading(true);
      const res = await dispatch(updateProfile(formData));
      setSubmitMessage("Cập nhật thành công");
      setIsSubmitLoading(false);
      console.log(res.payload.user, res.payload.user.avatar);
    } catch (err) {
      setIsSubmitLoading(false);
      setSubmitErr(true);
      setSubmitMessage(err.message);
      console.log(err.message);
    }
  };
  const inputOnchange = () => {
    setSubmitErr(false);
    setSubmitMessage("");
  };
  const imageUploadOnchange = e => {
    if (!e.target.files || e.target.files.length == 0) {
      setSelectAvatar(undefined);
      return;
    } else setSelectAvatar(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setCurrentAvatar(url);
  };

  useEffect(() => {
    if (!selectAvatar) return;
    return () => URL.revokeObjectURL(URL.createObjectURL(selectAvatar));
  }, [selectAvatar]);

  return (
    <Flex h={"100%"}>
      <Sidebar />
      <Box w={{ base: "30%", md: "25%" }} ml={"20"} mt={10}>
        <FormControl>
          <Flex direction={"column"} experimental_spaceY={"5"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Thông tin của bạn
            </Text>
            <Flex justifyContent={"center"}>
              <Box position={"relative"}>
                <Skeleton isLoaded={checkUser()}>
                  <Avatar src={currentAvatar} size={"2xl"} borderWidth={"2px"} borderColor={"cyan.500"}></Avatar>
                </Skeleton>

                <FormLabel htmlFor="avatar">
                  <Circle position={"absolute"} bottom={"0"} right={"0"} bgColor={"cyan.500"} p={"3"}>
                    <Icon as={BsCameraFill} w={"7"} h={"7"} color={"white"}></Icon>
                  </Circle>
                </FormLabel>
              </Box>
              <Input
                id="avatar"
                type={"file"}
                display={"none"}
                accept={"image/*"}
                onChange={imageUploadOnchange}
              ></Input>
            </Flex>
            <FormControl isRequired>
              <FormLabel htmlFor="name" fontSize={"2xl"}>
                Tên của bạn
              </FormLabel>
              <Skeleton isLoaded={currentUser.name}>
                <Input
                  id="name"
                  type="text"
                  p={"5"}
                  fontSize={"2xl"}
                  ref={nameInput}
                  defaultValue={currentUser.name}
                  onChange={() => inputOnchange()}
                />
              </Skeleton>
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel htmlFor="email" fontSize={"2xl"}>
                Email
              </FormLabel>
              <Input id="email" type="text" p={"5"} fontSize={"2xl"} defaultValue={currentUser.email} isDisabled />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="intro" fontSize={"2xl"}>
                Giới thiệu bản thân
              </FormLabel>
              <Skeleton isLoaded={currentUser.name}>
                <Textarea
                  id="intro"
                  type="text"
                  p={"5"}
                  fontSize={"2xl"}
                  placeholder="Giới thiệu bản thân  của bạn"
                  ref={aboutMeInput}
                  defaultValue={currentUser.aboutMe || ""}
                  onChange={() => inputOnchange()}
                />
              </Skeleton>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="contact" fontSize={"2xl"}>
                Liên hệ
              </FormLabel>
              <Skeleton isLoaded={currentUser.name}>
                <Input
                  id="contact"
                  type="text"
                  p={"5"}
                  fontSize={"2xl"}
                  ref={contactLinkInput}
                  defaultValue={currentUser.contactLink || ""}
                  onChange={() => inputOnchange()}
                />
              </Skeleton>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone" fontSize={"2xl"}>
                Số điện thoại
              </FormLabel>
              <Skeleton isLoaded={currentUser.name}>
                <Input
                  id="phone"
                  type="number"
                  p={"5"}
                  placeholder="Tùy chọn"
                  fontSize={"2xl"}
                  ref={phoneNumberInput}
                  defaultValue={currentUser.phoneNumber || ""}
                  onChange={() => inputOnchange()}
                />
              </Skeleton>
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
              isLoading={isSubmitLoading}
              onClick={submitUpdateProfileHandler}
            >
              Lưu & Thay đổi
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default withAuth(FormProfile);
