import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Post from "./Post";

const AllPosts = props => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="30px">
      {props.blogs.map(blog => (
        <Post blog={blog} />
      ))}
    </SimpleGrid>
  );
};

export default AllPosts;
