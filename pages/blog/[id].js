import { Box } from "@chakra-ui/react";
import React from "react";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import Blog from "../../components/blog/Blog";
import Navigation from "../../components/navigation/Navigation";
const blogReposity = RepositoryFactory.get("blogs");
const blog = props => {
  return (
    <Box>
      <Navigation />
      <Blog blog={props.blog} />
    </Box>
  );
};
export async function getStaticProps(context) {
  const blogData = await blogReposity.getBlog(context.params.id);
  return {
    props: {
      blog: blogData.data.data,
    },
  };
}
export async function getStaticPaths() {
  const blogs = await blogReposity.getAllBlogs();
  const slugs = blogs.data.data.data.map(blog => blog.id);
  return {
    paths: slugs.map(slug => ({
      params: {
        id: slug,
      },
    })),
    fallback: "blocking",
  };
}

export default blog;
