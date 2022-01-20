// repositoryFactory.js

import blogRepository from "./blog-api/blogRepository";
import commentRepository from "./comment-api/commentRepository";
import userReposity from "./user-api/userReposity";

const repositories = {
  users: userReposity,
  blogs: blogRepository,
  comments: commentRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
