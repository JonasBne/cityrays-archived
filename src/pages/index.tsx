import { type NextPage } from "next";

import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const InitialPage: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    void router.push("Home");
  }

  if (status === "unauthenticated") {
    void router.push("Login");
  }

  return <Layout pageTitle="Login" />;
};

export default InitialPage;
