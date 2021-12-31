import { Box } from "@chakra-ui/react";
import React from "react";

const AbsCenter = props => {
  return (
    <Box
      position={"absolute"}
      top={props.top || "50%"}
      left={"50%"}
      transform="auto"
      translateX={"-50%"}
      translateY={"-50%"}
    >
      {props.children}
    </Box>
  );
};

export default AbsCenter;
