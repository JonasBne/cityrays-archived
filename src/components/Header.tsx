import { signIn, signOut, useSession } from "next-auth/react";

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
      <h1 className="text-2xl font-bold tracking-wider text-teal-900">
        CityRays
      </h1>
      <div>
        <button
          className="mr-2 rounded-md bg-teal-700 px-2 py-1 text-sm text-neutral-100"
          onClick={handleClick}
        >
          {session ? "Log out" : "Log in"}
        </button>
      </div>
    </header>
  );
};
