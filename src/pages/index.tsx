import { type NextPage } from "next";

import { Layout } from "@/components/Layout";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.outlet.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle="Home">
      {data && data.length > 0 ? (
        data.map((outlet) => <div key={outlet.id}>{outlet.name}</div>)
      ) : (
        <div>No outlets found</div>
      )}
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
