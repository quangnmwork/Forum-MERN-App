import {
  Box,
  Button,
  Text,
  Flex,
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
  SkeletonCircle,
} from "@chakra-ui/react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { userActions } from "./../../redux/user/userSlice";
const NavigationButton = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log("Navigation button", user);
  const handleLoadedAvatar = () => {
    if (!user.currentUser.avatar) return true;
    else return user.currentUser.avatar && user.isLogin;
  };
  return (
    <Fragment>
      <Box display={user.isLogin ? "none" : "block"}>
        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          <Box mr={"7"}>
            <Button colorScheme="cyan" variant={"outline"} py={"7"} px={"5"}>
              <Text
                fontSize={{ md: "2xl", lg: "3xl" }}
                fontStyle={"normal"}
                onClick={() => {
                  Router.push("/signup");
                }}
              >
                Đăng kí
              </Text>
            </Button>
          </Box>
          <Box>
            <Button colorScheme="cyan" variant={"solid"} py={"8"} px={"5"}>
              <Text
                fontSize={{ md: "2xl", lg: "3xl" }}
                fontStyle={"normal"}
                color="white"
                onClick={() => {
                  Router.push("/login");
                }}
              >
                Đăng nhập
              </Text>
            </Button>
          </Box>
        </Flex>
      </Box>
      <SkeletonCircle isLoaded={handleLoadedAvatar} display={user.isLogin ? "block" : "none"}>
        <Flex alignItems={"center"} display={user.isLogin ? "block" : "none"}>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar
                name="Dan Abrahmov"
                src={
                  !user.currentUser.avatar
                    ? "https://res.cloudinary.com/dsyigmpux/image/upload/v1640765880/ferj1kzaesrzmv0ulfoz.png"
                    : user.currentUser.avatar
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize={"2xl"}
                onClick={() => {
                  Router.replace("/userProfile/accountSetting");
                }}
              >
                Thông tin cá nhân
              </MenuItem>
              <MenuItem
                fontSize={"2xl"}
                onClick={() => {
                  Router.replace("/userProfile/security");
                }}
              >
                Bảo mật
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize={"2xl"}
                onClick={() => {
                  dispatch(userActions.logout());
                  Router.replace("/");
                  Router.reload();
                }}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </SkeletonCircle>
    </Fragment>
  );
};

export default NavigationButton;
