import { type NextPage } from "next";

import { Layout } from "@/components/Layout";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const { data: outlets } = api.outlet.getAllSunny.useQuery();

  console.log(outlets);

  return (
    <Layout pageTitle="Home">
      <>hello</>
    </Layout>
  );
};

export default Home;
