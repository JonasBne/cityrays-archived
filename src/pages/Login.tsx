import { type NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";

const Login: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-slate-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-slate-600"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in with Google"}
      </button>
    </div>
  );
};

export default Login;
