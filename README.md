# Refresh puidv7 demo

This repository contains a demo of the [Refresh](https://refreshjs.org) [puidv7](https://refreshjs.org/puidv7) library.

To learn about puidv7 visit <https://refreshjs.org/puidv7> or <https://github.com/refreshjs/puidv7>.

If you step through the commit history you'll see how the app was built.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router v7 framework](https://reactrouter.com/start/framework/installation)
- [Vite](https://vitejs.dev/)
- [Bun](https://bun.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Postgres.js](https://github.com/porsager/postgres)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker Compose](https://docs.docker.com/compose/)

## puidv7 in action

The base of the repo is a simple TODO app.

If you view or edit a task, you'll see the ID in the URL.

Before adding puidv7, it is a standard UUIDv7 - revert the last commit to see it in action. The neat thing about this demo is you can jump between puidv7 and UUIDv7 implementations without changing any of the underlying data in the database, because using puidv7 with our Drizzle helper means it's always UUIDv7 in the DB

## Changes required to go from UUIDv7 to puidv7

### install new dependencies

```
bun install @refreshjs/puidv7
```

### edit: aap/db/schema.ts

```
-  import { text, uuid, pgTable } from "drizzle-orm/pg-core";
+  import { text, pgTable } from "drizzle-orm/pg-core";
+  import { puidv7drizzle } from "@refreshjs/puidv7/drizzle_helpers";
```

### edit: app/routes/home.tsx

```
-  import { uuidv7 } from "uuidv7";
+  import { newId } from "@refreshjs/puidv7";
```

```
-  id: uuid().primaryKey(),
+  id: puidv7drizzle("tsk")("id").primaryKey(),
```
