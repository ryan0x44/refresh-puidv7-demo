This file describes how to implement the new puidv7 ID format instead of uuidv7

# install new dependencies

bun install @refreshjs/puidv7

# edit: aap/db/schema.ts

-  import { text, uuid, pgTable } from "drizzle-orm/pg-core";
+  import { text, pgTable } from "drizzle-orm/pg-core";
+  import { puidv7drizzle } from "@refreshjs/puidv7/drizzle_helpers";

# edit: app/routes/home.tsx

-  import { uuidv7 } from "uuidv7";
+  import { newId } from "@refreshjs/puidv7";

-  id: uuid().primaryKey(),
+  id: puidv7drizzle("tsk")("id").primaryKey(),
