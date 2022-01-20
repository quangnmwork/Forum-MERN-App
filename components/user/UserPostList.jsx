import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Router from "next/router";
const UserPostList = props => {
  const getEditBlogId = e => {
    e.preventDefault();
    Router.replace(`/editPost/${e.target.dataset.id}`);
  };
  const getBlogId = e => {
    e.preventDefault();
    Router.replace(`/blog/${e.target.dataset.id}`);
    // console.log(e.target.dataset.id);
  };
  return (
    <Box>
      {props.blogs.map(blog => (
        <Flex mx={"auto"} align={"flex-start"} gap={"1"} direction={"column"} mt={"1"}>
          <Text
            fontSize={"3xl"}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            color={"cyan.600"}
            data-id={blog.id}
            onClick={getBlogId}
          >
            {blog.title}
          </Text>
          <Text fontSize={"3xl"}>Tạo vào ngày : {blog.releaseDate.slice(0, 10)}</Text>
          <Button
            colorScheme={"cyan"}
            px={"4"}
            py={"2"}
            fontSize={"2xl"}
            color={"white"}
            display={blog.user.id == props.id ? "block" : "none"}
            data-id={blog.id}
            onClick={getEditBlogId}
          >
            Chỉnh sửa
          </Button>
          <Box h={"1px"} w={"100%"} bgColor={"cyan.700"}></Box>
        </Flex>
      ))}
    </Box>
  );
};

export default UserPostList;
