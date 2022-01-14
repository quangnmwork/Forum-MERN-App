import { Box, Image, Text, Flex, Icon, HStack, Avatar } from "@chakra-ui/react";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import Router from "next/router";
const Post = props => {
  const getBlogId = e => {
    e.preventDefault();
    Router.push(`blog/${e.currentTarget.dataset.id}`);
  };
  return (
    <Box
      borderWidth="2px"
      borderRadius="lg"
      transition={" 0.3s ease-in-out"}
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      data-id={props.blog.id}
      onClick={getBlogId}
    >
      <Image src={props.blog.thumbnail} bgRepeat={"no-repeat"} height={{ base: "180px", xl: "220px" }} width={"100%"} />

      <Box p={"3"} height={"160px"}>
        <Flex alignItems={"center"} gap={"5"}>
          <Avatar size={"md"} src={props.blog.user.avatar} />
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {props.blog.user.name}
          </Text>
        </Flex>
        <Text fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"} isTruncated>
          {props.blog.title}
        </Text>
        <Text fontSize={"2xl"} noOfLines={"3"} wordBreak={"break-word"} isTruncated whiteSpace={"initial"}>
          {props.blog.content}
        </Text>
      </Box>
      <Flex justifyContent={"space-between"} px={"3"} mb={"5"}>
        <HStack justify={"center"}>
          <Icon as={FaRegCommentDots} w={"9"} h={"9"} />
          <Text fontSize={"2xl"}>{props.blog.ratingsQuantity}</Text>
        </HStack>
        <HStack justify={"center"}>
          <Icon as={AiOutlineCalendar} w={"9"} h={"9"} />
          <Text fontSize={"2xl"}>{props.blog.releaseDate.slice(0, 10)}</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Post;
