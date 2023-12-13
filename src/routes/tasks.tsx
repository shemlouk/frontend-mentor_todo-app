import { TodoList } from "@/ui/components/todo/list";
import { TodoTask } from "@/ui/components/todo/task";
import { randomUUID } from "crypto";
import Elysia from "elysia";
import { z } from "zod";

let inMemoryDb = [
  { id: randomUUID(), content: "Jog around the park 3x", isCompleted: false },
  { id: randomUUID(), content: "10 minutes meditation", isCompleted: false },
  { id: randomUUID(), content: "Readt for 1 hour", isCompleted: true },
  { id: randomUUID(), content: "Pick up groceries", isCompleted: false },
];

const createTaskBodySchema = z.object({
  content: z.string().min(1),
  isCompleted: z.string().optional(),
});

const selectQuerySchema = z.object({
  select: z.enum(["active", "completed"]),
});

const tasksRoute = new Elysia({ prefix: "/tasks" })
  .get("/", ({ query }) => {
    try {
      const { select } = selectQuerySchema.parse(query);

      const filteredTasks = inMemoryDb.filter((task) =>
        select === "completed" ? task.isCompleted : !task.isCompleted,
      );

      return <TodoList tasks={filteredTasks.toReversed()} selected={select} />;
    } catch (error) {
      return <TodoList tasks={inMemoryDb.toReversed()} />;
    }
  })
  .post("/", ({ body }) => {
    const { content, isCompleted } = createTaskBodySchema.parse(body);

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
  })
  .delete("/:taskId", ({ params: { taskId }, set }) => {
    const taskIndex = inMemoryDb.findIndex((task) => task.id === taskId);

    if (taskIndex < 0) {
      set.status = 404;
      return { message: "Task not found." };
    }

    inMemoryDb.splice(taskIndex, 1);
    return "";
  })
  .delete("/completed", () => {
    const uncheckedTasks = inMemoryDb.filter((task) => !task.isCompleted);
    inMemoryDb = [...uncheckedTasks];

    return <TodoList tasks={inMemoryDb} />;
  });

export { tasksRoute };
