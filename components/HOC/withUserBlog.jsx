import Router from "next/router";
import React, { useState } from "react";

import { useSelector } from "react-redux";

const withUserBlog = WrappedComponent => {
  return props => {
    const { currentUser } = useSelector(state => state.user);
    const { id } = Router.query;

    if (Object.keys(currentUser).length == 0) {
      Router.replace("/");
    } else if (!currentUser.blogs.some(blog => blog.id == id)) {
      Router.replace("/");
    }
    return <WrappedComponent {...props} />;
  };
};

export default withUserBlog;
