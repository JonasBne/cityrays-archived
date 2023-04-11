import { type NextPage } from "next";

import { Layout } from "@/components/Layout";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  // const { data: outlets } = api.outlet.getAllSunny.useQuery();

  // console.log(outlets);

  return (
    <Layout pageTitle="Home">
      <>hello DEV environment</>
    </Layout>
  );
};

export default Home;

export function getServerSideProps() {
  console.log("env variables", {
    nextAuthURL: process.env.NEXTAUTH_URL,
    databaseURL: process.env.DATABASE_URL,
  });
  return {
    props: {}, // will be passed to the page component as props
  };
}
