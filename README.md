# ☀️ CityRays

## Description

This repository contains the code for the [CityRays app}(https://cityrays.vercel.app/). This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel](https://vercel.com) (hosting)

## Database

There are two databases hosted remote at MongoDB Atlas:

- `cityrays-staging`: both the development and test branch connect to this database
- `cityrays`: only the master branch connects to this database

## Deployment

The CI/CD pipelines are set-up via Github Actions. The builded versions are then pushed to Vercel for deployment.

## Quick Start

Make sure to add the necessary env variables to your .env file!

```bash
# DB commands
npm run db:up     # start the database
npm run db:down   # stop the database
npm run db:init   # initialize the DB as cluster (one time only)
npm run db:sync   # create collections in db

# generate prisma client when the schema.prisma is changed
npx prisma generate

# open prisma studio (access db via web interface)
npx prisma studio

# start development server
npm dev

# Unit tests
npm vitest
```

## TRPC Panel

The TRPC Panel is a web interface that allows you to inspect your TRPC endpoints and their data. It is available in development mode only.

You can access the TRPC panel at [http://localhost:3000/api/panel](http://localhost:3000/api/panel).
