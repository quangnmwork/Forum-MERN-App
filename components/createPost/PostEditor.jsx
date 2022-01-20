import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { Box, Input, Flex, Text, Select, Button, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import withAuth from "../HOC/withAuth";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import Router from "next/router";
const blogRepository = RepositoryFactory.get("blogs");
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default), { ssr: false });

const PostEditor = props => {
  const [content, setContent] = useState(props.blog.content || "Viết nội dung của bạn ở đây");
  const [selectAvatar, setSelectAvatar] = useState();
  const [errTitle, setErrTitle] = useState("");
  const [errAvatar, setErrAvatar] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const imageUploadOnchange = e => {
    setErrAvatar("");
    if (!e.target.files || e.target.files.length == 0) {
      setSelectAvatar(undefined);
      return;
    } else setSelectAvatar(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectAvatar) return;
    return () => URL.revokeObjectURL(URL.createObjectURL(selectAvatar));
  }, [selectAvatar]);

  const titleRef = useRef("");
  const categoryRef = useRef("");
  const submitBlogHandler = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (titleRef.current.value.length == 0) throw new Error("title");
      if (selectAvatar == undefined) throw new Error("thumbnail");
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("category", categoryRef.current.value);
      formData.append("content", content);
      formData.append("thumbnail", selectAvatar);
      const res =
        props.type == "post"
          ? await blogRepository.postBlog(formData)
          : await blogRepository.updateBlog(Router.query.id, formData);
      console.log(res);
      setIsLoading(false);
      Router.replace("/");
    } catch (err) {
      setIsLoading(false);
      if (err.message == "thumbnail") setErrAvatar("Thumbnail không được trống");
      if (err.message == "title") setErrTitle("Tiêu đề không được trống");
    }
  };
  return (
    <Box width={"80%"} mx={"auto"} mt={"24"}>
      <Flex direction={"column"}>
        <FormControl isRequired isInvalid={errTitle.length > 0 ? true : false} mb={"5"}>
          <FormLabel fontSize={"4xl"} fontWeight={"bold"}>
            Tên bài viết
          </FormLabel>
          <Input
            type={"text"}
            width={"30%"}
            fontSize={"2xl"}
            pl={"4"}
            py={"3"}
            ref={titleRef}
            defaultValue={props.blog.title}
            onChange={() => {
              setErrTitle("");
            }}
          />
          <FormErrorMessage fontSize={"2xl"}>{errTitle}</FormErrorMessage>
        </FormControl>
        <FormControl mb={"5"} isRequired isInvalid={errAvatar.length > 0 ? true : false}>
          <FormLabel fontSize={"4xl"} fontWeight={"bold"}>
            Thumbnail
          </FormLabel>
          <Input
            accept={"image/*"}
            type={"file"}
            fontSize={"2xl"}
            w={{ base: "50%", lg: "30%" }}
            h={"16"}
            py={"2"}
            onChange={imageUploadOnchange}
          />
          <FormErrorMessage fontSize={"2xl"}>{errAvatar}</FormErrorMessage>
        </FormControl>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Thể loại
        </Text>
        <Select size="lg" fontSize={"2xl"} mb={"5"} width={"20%"} ref={categoryRef}>
          <option value="technology" selected={props.blog.category == "technology"}>
            Công nghệ
          </option>
          <option value="exp" selected={props.blog.category == "exp"}>
            Kinh nghiệm
          </option>
          <option value="other" selected={props.blog.category == "other"}>
            Khác
          </option>
        </Select>
        <MDEditor value={content} onChange={setContent} height={500} />
        <Button
          type="submit"
          variant="solid"
          colorScheme="cyan"
          fontSize={"2xl"}
          color={"white"}
          py={"8"}
          width={"20%"}
          alignSelf={"center"}
          my={"5"}
          isLoading={isLoading}
          onClick={submitBlogHandler}
        >
          {props.type == "post" ? "Tạo bài viết" : "Chỉnh sửa"}
        </Button>
      </Flex>
    </Box>
  );
};
export default withAuth(PostEditor);
