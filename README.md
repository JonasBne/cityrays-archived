# ☀️ CityRays

## Description

This repository contains the code for the [CityRays app](https://cityrays.vercel.app/). This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
For more technical information please refer to the [guidelines](./docs/GUIDELINES.md).

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel](https://vercel.com) (hosting)

## Quick Start

Make sure to add the necessary env variables to your .env file!

```bash
# generate prisma client when the schema.prisma is changed
npx prisma generate

# open prisma studio (access db via web interface)
npx prisma studio

# start development server
npm dev

# Unit tests
npm vitest
```

## License

This application is licensed under the [Apache-2.0 license](apache.org/licenses/LICENSE-2.0). If you're copying this app please let me know.
