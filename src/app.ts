import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

import { pagesRoute } from "./routes/pages";

const app = new Elysia().use(staticPlugin()).use(pagesRoute);

export { app };
