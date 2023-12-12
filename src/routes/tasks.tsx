import { TodoList } from "@/ui/components/todo/list";
import { TodoTask } from "@/ui/components/todo/task";
import { html } from "@elysiajs/html";
import { randomUUID } from "crypto";
import Elysia from "elysia";
import { z } from "zod";

const inMemoryDb = [
  { id: randomUUID(), content: "Jog around the park 3x", isCompleted: false },
  { id: randomUUID(), content: "10 minutes meditation", isCompleted: false },
  { id: randomUUID(), content: "Readt for 1 hour", isCompleted: true },
  { id: randomUUID(), content: "Pick up groceries", isCompleted: false },
];

const createTaskSchema = z.object({
  content: z.string().min(1),
  isCompleted: z.string().optional(),
});

const tasksRoute = new Elysia({ prefix: "/tasks" })
  .use(html())
  .get("/", () => <TodoList tasks={inMemoryDb} />)
  .post("/", ({ body }) => {
    const { content, isCompleted } = createTaskSchema.parse(body);

    const task = { id: randomUUID(), content, isCompleted: !!isCompleted };
    inMemoryDb.push(task);

    return <TodoTask {...task} />;
  })
  .patch("/:taskId/complete", ({ params: { taskId }, set }) => {
    const task = inMemoryDb.find((task) => task.id === taskId);

    if (!task) {
      set.status = 404;
      return { message: "Task not found." };
    }

    task.isCompleted = !task.isCompleted;

    return <TodoTask {...task} />;
  });

export { tasksRoute };
