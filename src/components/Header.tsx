import { signIn, signOut, useSession } from "next-auth/react";

const version = process.env.NEXT_PUBLIC_APP_VERSION;

export const Header = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      return void signIn();
    }
    return void signOut();
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-xl font-bold tracking-wider">CityRays</h1>
      <div>
        <button
          className="mr-2 rounded-md bg-slate-600 px-2 py-1 text-sm"
          onClick={handleClick}
        >
          {session ? "Log out" : "Log in"}
        </button>
        {version && <span className="text-sm font-light">{`v${version}`}</span>}
      </div>
    </header>
  );
};
