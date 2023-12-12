import { TodosPage } from "@/ui/layout/todos-page";
import Elysia from "elysia";

const pagesRoute = new Elysia().get("/", () => <TodosPage />);

export { pagesRoute };
