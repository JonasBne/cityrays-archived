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

There are two environments that are deployed to their own specific domain:

- `development`: connected to development branch and released to `https://cityrays-jonasbne.vercel.app/`
- `production`: connected to master branch and released to `https://cityrays.vercel.app/`

## Database

There are two databases hosted remote at MongoDB Atlas:

- `cityrays-staging`: only the development environment connects to this database
- `cityrays`: only the production environment connects to this database

## Deployment

The CI/CD pipelines are set-up via Github Actions. The different workflows are added in the `.github` folder.

Things to keep in mind:

- The only secret that needs to be added to the project settings in Github is the `VERCEL_TOKEN`. All the other environment variables are pulled from the Vercel project settings based on that token
- The `SKIP_ENV_VALIDATION` flag should be set to true, otherwise the build fails. If you want to test this locally, use the following command in the terminal `export SKIP_ENV_VALIDATION=true`

These are the workflows:

- `pull request`: this workflow runs whenever a pull request is opened, edited, synchronized or reopened. These jobs include setting up Node, installing npm packages and dependencies, running tests and perform some linting jobs.
- `preview`: this workflow runs whenever a pull request is opened, edited, synchronized or reopened against the developmebt branch. It deploys the changes on `https://cityrays-jonasbne.vercel.app/`.
- `deploy`: TO ADD

The builded versions are then pushed to Vercel for deployment.

## Conventions

### Commits

For `commits` we use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Branching

For `branch names` we use a simplified version:

- `feature`: for adding, refactoring or removing a feature (e.g. feature/filter-bars)
- `bugfix`: for fixing a bug (e.g. bugfix/more-shades)
- `hotfix`: for fixing bugs (or making changes) to production (only for emergencies) (e.g. hotfix/increase-threshold)
- `experimental`: any new feature or idea that is not part of a release or a sprint (e.g. experimental/dark-theme)
- `release`: a branch for tagging a specific release version (e.g. release/cityrays-1.0.1)

### Code flow branches

The following branches are expected to be permanently available on the repository:

- `development`: all new features and bug fixes are first brought to the development branch. Resolving code conflicts should be done as early as here. Developers test their code changes first on this branch. This branch contains the features that will be tested by the stakeholder(s). Decisions are made here if a feature should be brought to the production code.
- `master`: this is the production branch, if the repository is published, this is the default branch being presented.

We expect a `one-way merge` starting from the temporary branch > development > master. Only hotfixes are an exception because they are merged directly into master and thereafter to development.

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
