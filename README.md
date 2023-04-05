# ☀️ CityRays

## Description

This repository contains the code for the [CityRays app](https://cityrays.vercel.app/). This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel](https://vercel.com) (hosting)

## Environments

There are three environments that are deployed to their own specific domain:

- `development`: connected to development branch and released to `development-cityrays.vercel.app`
- `staging`: connected to test branch and released to `staging-cityrays.vercel.app`
- `production`: connected to master branch and released to `cityrays.vercel.app`

## Database

There are two databases hosted remote at MongoDB Atlas:

- `cityrays-staging`: both the development and staging environment connect to this database
- `cityrays`: only the production environment connects to this database

## Deployment

The CI/CD pipelines are set-up via Github Actions. The different workflows are added in the `.github` folder.

These are the workflows:

- `development (pull requests)`: this workflow runs whenever a pull request is opened, edited, synchronized or reopened. These jobs include setting up Node, installing npm packages and dependencies, running tests and perform some linting jobs.
- `release & build development branch`:
- `release & build test branch`:
- `release & build master branch`:

The builded versions are then pushed to Vercel for deployment.

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

## TRPC Panel

The TRPC Panel is a web interface that allows you to inspect your TRPC endpoints and their data. It is available in development mode only.

You can access the TRPC panel at [http://localhost:3000/api/panel](http://localhost:3000/api/panel).
