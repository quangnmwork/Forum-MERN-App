import React from "react";
import withAuth from "../../components/HOC/withAuth";
import withUserBlog from "../../components/HOC/withUserBlog";
import { RepositoryFactory } from "./../../api-factory/repositoryFactory";

import Navigation from "./../../components/navigation/Navigation";
import PostEditor from "../../components/createPost/PostEditor";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
const blogsRepository = RepositoryFactory.get("blogs");
const editPost = props => {
  return (
    <>
      <Head>
        <title>Chỉnh sửa bài viết</title>
        <meta name="description" content="Blog create content" />
      </Head>
      <Box>
        <Navigation />
        <PostEditor blog={props.blog} />
      </Box>
    </>
  );
};
export async function getServerSideProps(context) {
  const blogData = await blogsRepository.getBlog(context.params.id);
  if (!blogData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: blogData.data.data,
    },
  };
}

export default withAuth(withUserBlog(editPost));
