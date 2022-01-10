import Head from "next/head";
import Navigation from "../components/navigation/Navigation";
import ReactMarkdown from "react-markdown";
export default function Home() {
  return (
    <div>
      <Head>
        <title>QM Forum</title>
        <meta name="description" content="QM Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
    </div>
  );
}
