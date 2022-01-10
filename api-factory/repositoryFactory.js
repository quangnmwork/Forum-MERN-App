// repositoryFactory.js

import blogRepository from "./blog-api/blogRepository";
import userReposity from "./user-api/userReposity";

const repositories = {
  users: userReposity,
  blogs: blogRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
