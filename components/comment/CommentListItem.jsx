import {
  Box,
  Flex,
  Text,
  Avatar,
  Icon,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { convertTime } from "../../utils/convertDateTime";
import Router from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";

const commentRepository = RepositoryFactory.get("comments");

const CommentListItem = props => {
  const commentEl = props.commentEl;
  const editCommentContent = useRef();
  const IconDelete = useRef();
  const [editComment, setEditComment] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const checkedBelongUser = id => {
    if (props.currentUser.id == id && props.isLogin) return true;
    return false;
  };
  const deleteCommentHandler = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await commentRepository.deleteCommentByBlogId(Router.query.id, commentEl._id);
      console.log(res);
      IconDelete.current.click();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const editCommentHandler = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await commentRepository.editCommentByBlogId(
        Router.query.id,
        { rating: 5, content: editCommentContent.current.value },
        commentEl._id
      );
      console.log(res);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <Flex gap={"5"} mt={"10"} alignItems={"flex-start"}>
      <Box>
        <Avatar src={commentEl.user.avatar} size={"lg"} />
      </Box>
      {editComment || (
        <Flex direction={"column"} fontSize={"2xl"}>
          <Text fontWeight={"bold"}>{commentEl.user.name}</Text>
          <Text>{commentEl.content}</Text>
          <Flex gap={"3"} alignItems={"center"}>
            <Icon
              as={AiOutlineDelete}
              w={7}
              h={7}
              cursor={"pointer"}
              color={"red"}
              onClick={onOpen}
              display={checkedBelongUser(commentEl.user.id) ? "block" : "none"}
            />
            <Icon
              as={FiEdit2}
              w={7}
              onClick={() => {
                setEditComment(true);
              }}
              h={7}
              display={checkedBelongUser(commentEl.user.id) ? "block" : "none"}
              cursor={"pointer"}
            />
            <Text fontSize={"2xl"}> {convertTime(commentEl.releaseDate)}</Text>
          </Flex>
        </Flex>
      )}
      {!editComment || (
        <Box width={"100%"}>
          <Textarea
            type={"text"}
            fontSize={"2xl"}
            py={"3"}
            pl={"5"}
            defaultValue={commentEl.content}
            ref={editCommentContent}
            width={"100%"}
          ></Textarea>
          <Flex justifyContent={"flex-end"} mt={"3"}>
            <Button
              colorScheme={"cyan"}
              color={"white"}
              px={"16"}
              py={"8"}
              fontSize={"3xl"}
              isLoading={isLoading}
              onClick={e => {
                editCommentHandler(e);
                setEditComment(false);
              }}
            >
              Lưu
            </Button>
          </Flex>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3xl"}>Chú ý</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={"2xl"}>Bạn muốn xóa bình luận của mình không</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} fontSize={"2xl"} color={"white"} ref={IconDelete}>
              Close
            </Button>
            <Button
              colorScheme={"cyan"}
              fontSize={"2xl"}
              color={"white"}
              onClick={deleteCommentHandler}
              isLoading={isLoading}
            >
              Có
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default CommentListItem;
