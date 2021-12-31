// repositoryFactory.js

import userReposity from "./user-api/userReposity";

const repositories = {
  users: userReposity,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
