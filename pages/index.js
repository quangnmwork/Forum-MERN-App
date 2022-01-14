import Head from "next/head";
import Navigation from "../components/navigation/Navigation";
import ReactMarkdown from "react-markdown";
import Main from "./../components/main/Main";
import { RepositoryFactory } from "../api-factory/repositoryFactory";
const blogsRepository = RepositoryFactory.get("blogs");
export default function Home(props) {
  return (
    <div>
      <Head>
        <title>QM Forum</title>
        <meta name="description" content="QM Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Main blogs={props.blogs} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const blogs = await blogsRepository.getAllBlogs(context.query);
  return {
    props: {
      blogs: blogs.data.data.data,
    },
  };
}
