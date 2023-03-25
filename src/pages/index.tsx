import { type NextPage } from "next";

import { Layout } from "@/components/Layout";
import Login from "./Login";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          CityRays
        </h1>
        <div className="flex flex-col items-center gap-2">
          <Login />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
