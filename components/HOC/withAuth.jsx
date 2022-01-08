import React, { useState, useEffect } from "react";
import { getUserProfile } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";
const withAuth = WrappedComponent => {
  return props => {
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    useEffect(
      () =>
        (async () => {
          const accessToken = localStorage.getItem("token");
          if (!accessToken) {
            const isLoginPathName = ["/login", "/signup", "/forgotPassword", "/resetPassword"];
            if (!isLoginPathName.some(path => path == Router.pathname)) {
              Router.replace("/");
            }
          } else {
            const res = await dispatch(getUserProfile());
            if (res.payload) {
              const isLoginPathName = ["/login", "/signup", "/forgotPassword", "/resetPassword"];
              if (isLoginPathName.some(path => path == Router.pathname)) {
                Router.replace("/");
              }
              setIsLogin(true);
            } else {
              localStorage.removeItem("token");
              Router.replace("/");
            }
          }
        })(),
      []
    );

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
