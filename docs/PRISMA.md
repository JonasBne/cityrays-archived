# Quickstart - Prisma

This is general quick start for Prisma to get familiar with the commands.

### Install dependencies

```bash
npm install typescript ts-node @types/node prisma --dev
```

### Initialize prisma

This will create a schema.prisma file and a prisma folder.

```bash
npx prisma init --datasource-provider mongodb
```

### Setup the database

#### Local

**Create a docker-compose.yml file**

```bash
version: "3.8"
services:
  db:
    image: postgres:14.1-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - ./.data:/var/lib/postgresql/data
volumes:
  db:
    driver: local
```

**Startup/shutdown**

```bash
# startup the database
docker-compose up -d

# shutdown the database
docker-compose down
```

**pgAdmin**

You can use [pgAdmin](https://www.pgadmin.org/) to manage the DB. Not really needed here, but it's a nice tool to have.

#### Local

**Supabase**

Alternative you can setup the database on [supabase](https://supabase.com/)

- Create a account (sing-up with github account).
- Create a new project (remember your DB password)

### Your first schema model

**Edit the schema.prisma file**

```prisma
model User {
  id    String  @id @default(uuid())
  email String
  name  String?
}
```

**Configure the DB URL**

```bash
# specify the DB URL (local)
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/demo"

# Or supabase
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.hjliykvyuvuffylsumsd.supabase.co:5432/postgres"
```

**and push to DB**

```bash
# push changes to DB & generate client
npx prisma db push

# open DB in browser
npx prisma studio
```

### Access the DB from JS

main.ts (read some data from the DB)

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main();
```

Run it

```bash
npx ts-node main.ts
```

Write some data to the DB

```ts
async function main() {
  const users = [
    { email: "john@euri.com", name: "John" },
    { email: "else@euri.com", name: "Else", age: 12 },
  ];
  await prisma.user.createMany({
    data: users,
  });
  // ...
}
```

Query

```ts
async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: "john@euri.com",
    },
  });
  // ...
}
```

Set Index

```
model User {
  id    String  @id @default(uuid())
  email String  @unique
  name  String?
  age   Int?

  @@index([email])
}
```

### Where is my ERD

**Install ERD generator**

```bash
yarn add -D prisma-erd-generator @mermaid-js/mermaid-cli @prisma/generator-helper
```

**Configure it**

Add to the schema.prisma file

```
generator erd {
    provider = "prisma-erd-generator"
}
```

### Where are my SQL Scripts, I want to have migrations

**Create your first migration**

```bash
# generate a migration
npx prisma migrate dev
```

**add a new field to the schema**

```prisma
model User {
  id    String  @id @default(uuid())
  email String  @unique
  name  String?
  age   Int?
}
```

**add a new migration**

```bash
# generate a migration with name
npx prisma migrate dev --name add-age
```

### Relations

**Update the schema**

```
model User {
  id    String  @id @default(uuid())
  // ...
  posts Post[]
}

model Post {
  id        String     @id @default(uuid())
  title     String
  content   String?
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

**Query the data**

```ts
const user = await prisma.user.findUnique({
  where: {
    email: "bob@euri.com",
  },
  include: {
    posts: true,
  },
});
```

**Create with relations**

```ts
await prisma.post.create({
  data: {
    userId: user?.id,
    title: "My first post",
    published: true,
  },
});

// or create with relations query
await prisma.post.create({
  data: {
    User: {
      connect: {
        email: "john@euri.com",
      },
    },
    title: "My first post",
    published: true,
  },
});

// create user with post
await prisma.user.create({
  data: {
    email: "me@euri.com",
    name: "Me",
    posts: {
      create: {
        title: "My first post",
        published: true,
      },
    },
  },
});
```

More about relations see [Prisma relations](https://medium.com/yavar/prisma-relations-2ea20c42f616)

### Extra Information

- [Prisma - Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [It's Prisma Time - Tutorial](https://dev.to/this-is-learning/its-prisma-time-introduction-3a3h)
