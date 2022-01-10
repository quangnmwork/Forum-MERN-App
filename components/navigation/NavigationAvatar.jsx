import React from "react";
import {
  Menu,
  Flex,
  SkeletonCircle,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
  Box,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./../../redux/user/userSlice";
import Router from "next/router";
const NavigationAvatar = props => {
  const dispatch = useDispatch();
  const handleLoadedAvatar = () => {
    if (!props.currentUser.avatar) return true;
    else return props.currentUser.avatar && user.isLogin;
  };
  const user = useSelector(state => state.user);
  return (
    <Box h={"12"} w={"12"} display={user.isLogin ? "block" : "none"}>
      <SkeletonCircle isLoaded={handleLoadedAvatar}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar
                name="Dan Abrahmov"
                src={
                  !props.currentUser.avatar
                    ? "https://res.cloudinary.com/dsyigmpux/image/upload/v1640765880/ferj1kzaesrzmv0ulfoz.png"
                    : props.currentUser.avatar
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
                }}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </SkeletonCircle>
    </Box>
  );
};

export default NavigationAvatar;
