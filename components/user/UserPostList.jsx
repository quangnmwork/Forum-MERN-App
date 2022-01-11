import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserPostList = props => {
  return (
    <Box>
      {props.blogs.map(blog => (
        <Flex mx={"auto"} align={"flex-start"} gap={"1"} direction={"column"} mt={"1"}>
          <Text fontSize={"3xl"} _hover={{ textDecoration: "underline", cursor: "pointer" }} color={"cyan.600"}>
            {blog.title}
          </Text>
          <Text fontSize={"3xl"}>Tạo vào ngày : {blog.releaseDate.slice(0, 10)}</Text>
          <Box h={"1px"} w={"100%"} bgColor={"cyan.700"}></Box>
        </Flex>
      ))}
    </Box>
  );
};

export default UserPostList;
