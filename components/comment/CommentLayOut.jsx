import { Box } from "@chakra-ui/react";
import React from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data);
import useSWR from "swr";
const CommentLayOut = props => {
  const { data, error } = useSWR(`http://127.0.0.1:8000/api/v1/blogs/${props.blog.id}/comments`, fetcher, {
    refreshInterval: 2000,
  });
  // console.log(data);
  return (
    <Box width={{ xl: "60%", lg: "80%", base: "95%" }} mx={"auto"} mt={"10"}>
      <CommentInput />
      {!error ? <CommentList comment={data} /> : null}
    </Box>
  );
};

export default CommentLayOut;
