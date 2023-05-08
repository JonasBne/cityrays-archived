# ☀️ CityRays

## What's the idea?

Have you ever found yourself in the dilemma of trying to find the perfect spot to enjoy a drink or meal on a sunny day, only to be left disappointed by the lack of sunlight on the terrace? Or on a scorching summer day, have you struggled to find a shaded spot to cool down?

We're trying to come up with a solution that will put an end to your terrace troubles. Introducing CityRays, a new app that presents you with all the sunny spots in your area (Antwerp), complete with information about the evolution of sunshine throughout the day, opening hours, route directions, and more. No more searching for shadow maps or guessing which terrace will have the perfect amount of sunshine.

While this idea isn't entirely new, we're taking a fresh approach. Most existing applications provide users with shadow maps to find sunny spots, but we want to make things easier. Our app will show you all the sunny places in your area, and even let you know how much sunshine you can expect at each spot. You can choose between fully sunny or partly sunny terraces, depending on your preference.

Of course, data is the key to making this work. We need information about the location of bars and restaurants, the size and orientation of their terraces, and the surrounding buildings and trees that could affect sunshine. We also need to factor in the position of the sun at any given day and time. At this moment, we don't have the resources to tackle the complexities of gathering all the necessary data automatically. The quality of our data heavily depends on the available building information. Unfortunately, there are limited free resources that offer reliable data. We attempted to generate our own shademaps using OSM Buildings, but encountered accuracy issues due to the lack of information about buildings in some areas. We have ruled out paying for providers to access more current data due to budget constraints. Instead, we're manually gathering data by checking for each week, in intervals of 15 minutes, how much sunshine there is on a terrace. It's definitely a time-consuming task, but we believe it's worth it to deliver a reliable and accurate solution to our users. That's also why we focus exclusively on Antwerp for now. I'm currently exploring the possibility of creating more precise shademaps by utilizing GIS software in conjunction with the free 3D models provided by the City of Antwerp. This approach could potentially improve the accuracy of our data and enable us to provide users with even more reliable information about sunny and shaded terraces in the city.

Our main motivation behind building this app is not just to provide a valuable service, but also to learn and grow. We're passionate about exploring new possibilities and pushing our boundaries to deliver a unique experience to our users.

We understand that there are challenges ahead of us, but we're excited to tackle them head-on and see how far we can go with this project. So get ready to enjoy sunny days to their fullest. Stay tuned for more updates on our progress!

## Team

- `Development`: Jonas Boone
- `User experience & interface`: Toke Joos
- `User testing & data`: Sander Traa

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
