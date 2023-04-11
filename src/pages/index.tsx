import { type NextPage } from "next";

import { Layout } from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <>Cityrays production environment under construction.</>
    </Layout>
  );
};

export default Home;

export function getServerSideProps() {
  // the log can be found in the vercel logs
  console.log("Environment variables", {
    nextAuthURL: process.env.NEXTAUTH_URL,
    databaseURL: process.env.DATABASE_URL,
  });
  return {
    props: {}, // will be passed to the page component as props
  };
}
