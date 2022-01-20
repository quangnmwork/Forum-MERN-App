import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import CommentListItem from "./CommentListItem";
const CommentList = props => {
  const { currentUser, isLogin } = useSelector(state => state.user);
  const [maxItem, setMaxItem] = useState(5);
  const [commentData, setCommentData] = useState(0);
  const loadMoreHandler = () => {
    setMaxItem(max => max + 5);
  };
  useEffect(() => {
    setCommentData(props.comment?.data.length);
  }, [props.comment?.data]);
  return (
    <Box my={"12"}>
      {props.comment != undefined
        ? props.comment.data
            .slice(0, maxItem)
            .map(commentEl => <CommentListItem currentUser={currentUser} isLogin={isLogin} commentEl={commentEl} />)
        : null}
      <Flex justifyContent={"center"} mt={"5"} display={maxItem >= commentData || !commentData ? "none" : "flex"}>
        <Button colorScheme={"cyan"} color={"white"} px={"12"} py={"9"} fontSize={"3xl"} onClick={loadMoreHandler}>
          Xem thêm
        </Button>
      </Flex>
    </Box>
  );
};

export default CommentList;
