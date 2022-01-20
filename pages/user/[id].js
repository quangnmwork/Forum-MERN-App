import React from "react";
import { RepositoryFactory } from "../../api-factory/repositoryFactory";
import UserProfile from "../../components/user/UserProfile";
const userReposity = RepositoryFactory.get("users");
const userProfile = props => {
  console.log(props.user);
  return <UserProfile user={props.user} />;
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const user = await userReposity.getUserProfileById(id);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: user.data.data,
    },
  };
}

export async function getStaticPaths() {
  const users = await userReposity.getAllUsers();
  const slugs = users.data.data.data.map(user => user.id);
  return {
    paths: slugs.map(slug => ({
      params: {
        id: slug,
      },
    })),
    fallback: false,
  };
}

export default userProfile;
