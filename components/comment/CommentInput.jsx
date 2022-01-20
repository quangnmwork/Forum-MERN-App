import React, { useRef, useState } from "react";
import { Box, Flex, Text, Textarea, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Router from "next/router";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";

const commentRepository = RepositoryFactory.get("comments");
const CommentInput = () => {
  const { isLogin } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const commentContent = useRef();
  const submitCommentHandler = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await commentRepository.postCommentByBlogId(Router.query.id, {
        rating: 5,
        content: commentContent.current.value,
      });
      console.log(res);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <Box display={isLogin ? "block" : "none"}>
      <Box>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Bình luận
        </Text>
        <Textarea
          type={"text"}
          fontSize={"2xl"}
          py={"3"}
          pl={"5"}
          placeholder="Bình luận của bạn"
          mt={"3"}
          ref={commentContent}
        />
      </Box>
      <Flex justifyContent={"flex-end"} mt={"5"}>
        <Button
          isLoading={isLoading}
          colorScheme={"cyan"}
          color={"white"}
          px={"16"}
          py={"9"}
          fontSize={"3xl"}
          onClick={submitCommentHandler}
        >
          Gửi
        </Button>
      </Flex>
    </Box>
  );
};

export default CommentInput;
