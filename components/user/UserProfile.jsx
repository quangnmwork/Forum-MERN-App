import {
  Avatar,
  Box,
  Flex,
  Wrap,
  WrapItem,
  Text,
  Button,
  HStack,
  Tabs,
  Icon,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import { AiOutlinePhone } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { useSelector } from "react-redux";
import UserPostList from "./UserPostList";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";

const userReposity = RepositoryFactory.get("users");
const UserProfile = props => {
  const user = props.user;
  const { currentUser, isLogin } = useSelector(state => state.user);
  const [following, setFollowing] = useState(user.following.length);
  const [followers, setFollowers] = useState(user.followers.length);
  const [isLoading, setIsLoading] = useState(false);
  const followButtonHanlder = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let res;
      if (followState == "Unfollow") {
        res = await userReposity.unFollow(user.id);
        setIsLoading(false);
        setFollowState("Follow");
        setFollowers(prev => prev - 1);
      }
      if (followState == "Follow") {
        res = await userReposity.follow(user.id);
        setIsLoading(false);
        setFollowState("Unfollow");
        setFollowers(prev => prev + 1);
      }
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const isFollow = user.followers.some(follower => follower.id == currentUser.id);

  const initFollow = isFollow ? "Unfollow" : "Follow";
  console.log(isFollow);
  const [followState, setFollowState] = useState(user.id == currentUser.id ? "Edit Profile" : `${initFollow}`);
  return (
    <Box>
      <Navigation />
      <Box w={"100%"} mt={"15"}>
        <Flex w={{ base: "100%", lg: "60%" }} align={"center"} mx={"auto"} direction={"column"}>
          <Avatar src={user.avatar || ""} w={"64"} h={"64"} border={"2px solid cyan"} />
          <Text fontSize={"4xl"} fontWeight={"bold"} mt={"3"}>
            {user.name}
          </Text>
          <Flex justifyContent={"center"} gap={"5"}>
            <Flex fontSize={"2xl"} gap={"1"}>
              <Text fontWeight={"bold"}>Đang theo dõi:</Text>
              <Text>{following}</Text>
            </Flex>
            <Flex fontSize={"2xl"} gap={"1"}>
              <Text fontWeight={"bold"}>Được theo dõi:</Text>
              <Text>{followers}</Text>
            </Flex>
          </Flex>
          <Button
            variant={"solid"}
            fontSize={"2xl"}
            color={"white"}
            colorScheme={"cyan"}
            display={followState == "Edit Profile" || isLogin == false ? "none" : "block"}
            onClick={followButtonHanlder}
            isLoading={isLoading}
          >
            {followState}
          </Button>
        </Flex>
        <Flex w={{ base: "100%", lg: "60%" }} mx={"auto"} direction={"column"} mt={"10"}>
          <Tabs variant="enclosed" isFitted>
            <TabList>
              <Tab _selected={{ color: "white", bg: "cyan.500" }} fontSize={"2xl"}>
                Thông tin
              </Tab>
              <Tab _selected={{ color: "white", bg: "cyan.500" }} fontSize={"2xl"}>
                Blogs
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel w={"100%"} fontSize={"3xl"}>
                <Flex mx={"auto"} align={"flex-start"} gap={"5"}>
                  <Icon as={AiOutlinePhone} w={12} h={12} />
                  <Text fontWeight={"bold"} minW={"20%"}>
                    Số điện thoại:
                  </Text>
                  <Text>{user.phoneNumber || "Chưa có số điện thoại"}</Text>
                </Flex>
                <Flex mx={"auto"} align={"flex-start"} gap={"5"} mt={"4"}>
                  <Icon as={BiLink} w={12} h={12} />
                  <Text fontWeight={"bold"} minW={"20%"}>
                    Địa chỉ liên hệ:
                  </Text>
                  <Text>{user.contactLink || "Chưa có địa chỉ liên hệ"}</Text>
                </Flex>
                <Flex mx={"auto"} align={"flex-start"} gap={"5"} mt={"4"}>
                  <Icon as={MdOutlineDescription} w={12} h={12} />
                  <Text fontWeight={"bold"} minW={"20%"}>
                    Mô tả:
                  </Text>
                  <Text overflowWrap={"break-word"} wordBreak={"break-word"}>
                    {user.aboutMe || "Chưa có mô tả"}
                  </Text>
                </Flex>
              </TabPanel>
              <TabPanel>
                <UserPostList blogs={user.blogs} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserProfile;
