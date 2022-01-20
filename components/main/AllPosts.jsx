import { SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Router from "next/router";

const AllPosts = props => {
  const [maxItem, setMaxItem] = useState(props.blogs.length > 6 ? 6 : props.blogs.length);
  const [blogs, setBlogs] = useState(props.blogs.slice(0, maxItem));
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    // console.log(maxItem, props.blogs);
    if (maxItem >= props.blogs) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setMaxItem(prev => prev + 6);
    }, 600);
  };

  useEffect(() => {
    setBlogs(props.blogs.slice(0, maxItem));
  }, [maxItem]);
  useEffect(() => {
    setMaxItem(6);
    setBlogs(props.blogs.slice(0, 6));
  }, [Router.query.category]);

  return (
    <InfiniteScroll dataLength={blogs.length} hasMore={hasMore} next={fetchMoreData}>
      <SimpleGrid columns={[1, 1, 2, 3]} spacingX={{ base: "0px", lg: "30px" }} spacingY={"30px"}>
        {blogs.map(blog => (
          <Post blog={blog} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default AllPosts;
{
  /*  spacing="30px"> */
}
