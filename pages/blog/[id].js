import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import Blog from "../../components/blog/Blog";
import Navigation from "../../components/navigation/Navigation";
import CommentLayOut from "../../components/comment/CommentLayOut";
const blogRepository = RepositoryFactory.get("blogs");
const commentRepository = RepositoryFactory.get("comments");
const blog = props => {
  return (
    <>
      <Head>
        <title>{props.blog.title}</title>
        <meta name="description" content="Blog content" />
      </Head>
      <Box>
        <Navigation />
        <Blog blog={props.blog} />
        <CommentLayOut blog={props.blog} />
      </Box>
    </>
  );
};
export async function getStaticProps(context) {
  const blogData = await blogRepository.getBlog(context.params.id);
  // const commentData = await commentRepository.getCommentByBlogId(context.params.id);
  if (!blogData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      blog: blogData.data.data,
      // comment: commentData.data.data,
    },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const blogs = await blogRepository.getAllBlogs();
  const slugs = blogs.data.data.data.map(blog => blog.id);
  return {
    paths: slugs.map(slug => ({
      params: {
        id: slug,
      },
    })),
    fallback: true,
  };
}

export default blog;
