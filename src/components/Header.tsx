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
      <h1 className="text-2xl font-bold tracking-wider text-gray-700">
        CityRays
      </h1>
      <div>
        <button
          className="mr-2 rounded-md border border-teal-700 px-2 py-1 text-sm text-teal-700 hover:bg-teal-100"
          onClick={handleClick}
        >
          {session ? "Log out" : "Log in"}
        </button>
      </div>
    </header>
  );
};
