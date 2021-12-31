import { Box } from "@chakra-ui/react";
import Navigation from "./../navigation/Navigation";
const Layout = props => {
  return (
    <Box>
      <Box>{props.children}</Box>
    </Box>
  );
};

export default Layout;
