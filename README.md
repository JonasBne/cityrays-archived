# ☀️ CityRays

## Repository development discontinued

The development of this repository has come to an end. However, the development of CityRays will continue in a new repository with, amongst others, different technological choices. For the latest updates and ongoing development, please refer to the new [repository](https://github.com/JonasBne/cityrays).

## What's the idea?

Have you ever found yourself in the dilemma of trying to find the perfect spot to enjoy a drink or meal on a sunny day, only to be left disappointed by the lack of sunlight on the terrace? Or on a scorching summer day, have you struggled to find a shaded spot to cool down?

We're trying to come up with a solution that will put an end to your terrace troubles. Introducing CityRays, an app that presents you with all the sunny spots in your area (Antwerp), complete with information about the evolution of sunshine throughout the day, opening hours, route directions, and more. No more searching for shadow maps or guessing which terrace will have the perfect amount of sunshine.

While this idea isn't entirely new, we're taking a fresh approach. Most existing applications provide users with shadow maps to find sunny spots, but we want to make things easier. Our app will show you all the sunny places in your area, and even let you know how much sunshine you can expect at each spot. You can choose between fully sunny or partly sunny terraces, depending on your preference.

Get ready to enjoy sunny days to their fullest. Stay tuned for more updates on our progress!

## Documentation

This repository contains the code for the [CityRays app](https://cityrays.vercel.app/). This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. For more technical information please refer to the [documentation](./docs/GUIDELINES.md).

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
