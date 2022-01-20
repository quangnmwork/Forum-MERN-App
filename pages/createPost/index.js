import Navigation from "./../../components/navigation/Navigation";
import PostEditor from "../../components/createPost/PostEditor";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
function md() {
  return (
    <>
      <Head>
        <title>Tạo bài viết</title>
        <meta name="description" content="Blog create content" />
      </Head>
      <Box>
        <Navigation />
        <PostEditor type={"post"} blog={{}} />
      </Box>
    </>
  );
}
export default md;
