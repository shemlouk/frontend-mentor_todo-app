import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

import { pagesRoute } from "./routes/pages";
import { tasksRoute } from "./routes/tasks";

const app = new Elysia().use(staticPlugin()).use(tasksRoute).use(pagesRoute);

export { app };
