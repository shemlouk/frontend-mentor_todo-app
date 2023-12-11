import { TodosPage } from "@/ui/layout/todos-page";
import { html } from "@elysiajs/html";
import Elysia from "elysia";

const pagesRoute = new Elysia().use(html()).get("/", () => <TodosPage />);

export { pagesRoute };
