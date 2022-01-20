import React from "react";
import { Box, Text, Flex, Avatar, HStack, Button } from "@chakra-ui/react";
import style from "./reactMD.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeKatex from "rehype-katex";

import Router from "next/router";

const Blog = props => {
  const getUserId = e => {
    e.preventDefault();
    Router.replace(`/user/${e.target.dataset.id}`);
  };

  return (
    <Box width={{ xl: "60%", lg: "80%", base: "95%" }} mx={"auto"}>
      <Box fontSize={"8xl"} fontWeight={"bold"} width={"100%"} mt={"10"}>
        <Text>{props.blog.title}</Text>
      </Box>
      <Flex
        fontSize={"3xl"}
        fontWeight={"bold"}
        width={"100%"}
        py={"6"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack gap={"4"} align={"center"}>
          <Avatar src={props.blog.user.avatar || ""} size={"xl"} />
          <Text
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            data-id={props.blog.user.id}
            onClick={getUserId}
          >
            {props.blog.user.name}
          </Text>
        </HStack>
      </Flex>
      <Box className={style.image} width={"100%"}>
        <Image src={props.blog.thumbnail} width={1200} height={600} />
      </Box>
      <Box h={"10"} />
      <ReactMarkdown
        children={props.blog.content}
        className={style.md}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dracula}
                language={"javascript"}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      ></ReactMarkdown>
    </Box>
  );
};

export default Blog;
