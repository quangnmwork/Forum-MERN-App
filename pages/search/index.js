import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Navigation from "./../../components/navigation/Navigation";
import { RepositoryFactory } from "./../../api-factory/repositoryFactory";
import AllPosts from "../../components/main/AllPosts";
const blogsRepository = RepositoryFactory.get("blogs");
const search = props => {
  return (
    <Box>
      <Navigation />

      <Box width={"80%"} mx={"auto"} mt={"24"}>
        <Text fontSize={"4xl"} fontWeight={"bold"} mb={"10"}>
          Có {props.blogs.length} kết quả liên quan
        </Text>
        <AllPosts blogs={props.blogs} />
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const res = await blogsRepository.getAllBlogs(context.query);
  return {
    props: { blogs: res.data.data.data },
  };
}
export default search;
