import { type NextPage } from "next";

import { Layout } from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <>hello preview environment</>
    </Layout>
  );
};

export default Home;

export function getServerSideProps() {
  // log environment variables to enable debugging
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.log("App loaded with the following environment variables", {
      nextAuthURL: process.env.NEXTAUTH_URL,
      databaseURL: process.env.DATABASE_URL,
    });
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
