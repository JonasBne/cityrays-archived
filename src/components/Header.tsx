import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <h1>CityRays</h1>
      <div>
        {session ? (
          <>
            <span>{session.user.name}</span>
            <button onClick={() => void signOut()}></button>
          </>
        ) : (
          <button onClick={() => void signIn()}></button>
        )}
      </div>
    </header>
  );
};
