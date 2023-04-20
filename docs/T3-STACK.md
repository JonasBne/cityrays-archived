# Quickstart - Next / AuthJS

A quick start for T3-Stack with NextJS, AuthJS, Prisma & tRPC

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Create & Startup App

```bash
# create app
npm create t3-app@latest

# install deps
yarn  # or npm install

# startup
yarn dev
```

### NextJS

React Meta Framework with file based routing and SSR

```
src/pages
  _app.tsx        // app wrapper
  index.tsx       // home page

src/server
  /api
    /routers
      example.ts  // tRPC router
  auth.ts
  db.ts
```

### Add daisyui & typography

install

```bash
yarn add daisyui @tailwindcss/typography --dev
```

configure (tailwind.config.js)

```js
plugins: [require("@tailwindcss/typography"), require("daisyui")],
```

### Simple App

Fetch data via tRPC

```tsx
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <main className="p-3">
      <p>{data?.greeting}</p>
    </main>
  );
};
```

Login

```tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <button className="btn" onClick={() => signIn()}>
      Sign-in
    </button>
    <p>{sessionData?.user.email}</p>
  )
}
```

## Setup your authentication

Authentication is performed by [Auth.js](https://authjs.dev/)

### Setup for google auth

Replace Discord

```js
// original
// ./src/server/auth.ts
import DiscordProvider from "next-auth/providers/discord";
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      // ...
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};
```

with Google

```js
// to replace with (./src/server/auth.ts)
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // remove the DB integration
  // callbacks: {
  //   session: ({ session, user }) => {
  //     // ...
  //   },
  // },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
```

Set GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET

```ts
// original (./src/env.mjs)
DISCORD_CLIENT_ID: z.string(),
DISCORD_CLIENT_SECRET: z.string(),

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  // ...
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
};
```

With Google

```ts
// to replace with (./src/env.mjs)
GOOGLE_CLIENT_ID: z.string(),
GOOGLE_CLIENT_SECRET: z.string(),

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  // ...
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
```

Add secrets

```
// .env
NEXTAUTH_SECRET="fFbZMHLpOQaPlgkyCNN54ChFYbYWiBT//xTCfXS/9CA="
GOOGLE_CLIENT_ID="866059570312-gqojt5mbc8f7oj49h2ba7uhki52l82h7.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
```

### Login/Logout

Login/logout

```tsx
<main className="p-3">
  {!sessionData && (
    <button onClick={() => signIn()} className="btn">
      Sign-in
    </button>
  )}
  {sessionData && (
    <button onClick={() => signOut()} className="btn">
      Sign-out
    </button>
  )}
  <p>{sessionData?.user.email}</p>
</main>
```

Fetch secure data via tRPC

```tsx
const { data } = api.example.getSecretMessage.useQuery();

return <p>{data}</p>;
```

### Auth with the DB provider

- Startup you DB (if not already running)
- Export DATABASE_URL

```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/demo"
```

- See prisma.schema for DB schema

- Add adapter & session handling (again)

```js
export const authOptions: NextAuthOptions = {
  callbacks: {                      // <--------
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),   // <--------
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
```

### Extra Information

- [create-t3-app](https://create.t3.gg/)
- [authjs](https://authjs.dev/)
- [zod](https://zod.dev/)
- [daisyui](https://daisyui.com/components/)
