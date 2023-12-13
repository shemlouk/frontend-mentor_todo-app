import Elysia from "elysia";
import { z } from "zod";

import { TasksRepository } from "@/repositories/tasks";
import { TodoList } from "@/ui/components/todo/list";
import { TodoTask } from "@/ui/components/todo/task";

const tasksRepository = new TasksRepository();

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

      const tasks =
        select === "active"
          ? tasksRepository.getActiveTasks()
          : tasksRepository.getCompletedTasks();

      return <TodoList tasks={tasks} selected={select} />;
    } catch (error) {
      const tasks = tasksRepository.getAllTasks();
      return <TodoList tasks={tasks} />;
    }
  })
  .post("/", ({ body }) => {
    const { content, isCompleted } = createTaskBodySchema.parse(body);

    const { task } = tasksRepository.addTask({
      content,
      isCompleted: !!isCompleted,
    });

    return <TodoTask {...task} />;
  })
  .patch("/:taskId/complete", ({ params: { taskId }, set }) => {
    const task = tasksRepository.getTask(taskId);

    if (task) {
      task.isCompleted = !task.isCompleted;
      tasksRepository.updateTask(task);

      return <TodoTask {...task} />;
    }

    set.status = 404;
    return { message: "Task not found." };
  })
  .delete("/:taskId", ({ params: { taskId } }) => {
    tasksRepository.deleteTask(taskId);
  })
  .delete("/completed", () => {
    const completedTasks = tasksRepository.getCompletedTasks();

    completedTasks.forEach((task) => {
      tasksRepository.deleteTask(task.id);
    });

    const tasks = tasksRepository.getAllTasks();
    return <TodoList tasks={tasks} />;
  })
  .post("/sort", ({ body, query }) => {
    const list = [];

    for (const key in body as {}) {
      list.push(key);
    }

    try {
      const { select } = selectQuerySchema.parse(query);
      tasksRepository.reorderTasks(list, select);

      const tasks =
        select === "active"
          ? tasksRepository.getActiveTasks()
          : tasksRepository.getCompletedTasks();

      return <TodoList tasks={tasks} selected={select} />;
    } catch (error) {
      tasksRepository.reorderTasks(list);
      const tasks = tasksRepository.getAllTasks();
      return <TodoList tasks={tasks} />;
    }
  });

export { tasksRoute };
