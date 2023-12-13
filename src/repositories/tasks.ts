import { randomUUID } from "crypto";
import { Task } from "../lib/definitions";

const path = new URL("../data.json", import.meta.url);
const { tasks } = await Bun.file(path).json<{ tasks: Task[] }>();

export class TasksRepository {
  private inMemoryTasks: Map<string, Task> = new Map();
  private idsSortedMap: Record<string, number> = {};
  private idsSortedList: string[] = [];

  constructor() {
    for (let index = 0; index < tasks.length; index++) {
      const task = tasks[index];

      this.inMemoryTasks.set(task.id, task);
      this.idsSortedMap[task.id] = index;
      this.idsSortedList.push(task.id);
    }
  }

  private updateIdsMap() {
    this.idsSortedMap = {};

    for (let index = 0; index < this.idsSortedList.length; index++) {
      const id = this.idsSortedList[index];
      this.idsSortedMap[id] = index;
    }
  }

  private updateIdsList() {
    this.idsSortedList = [];

    const entries = Object.entries(this.idsSortedMap);
    const indexesMap = Object.fromEntries(entries.map((e) => e.reverse()));

    for (let index = 0; index < entries.length; index++) {
      this.idsSortedList.push(indexesMap[index]);
    }
  }

  getTask(taskId: string) {
    return this.inMemoryTasks.get(taskId);
  }

  addTask({ content, isCompleted }: Omit<Task, "id">) {
    const id = randomUUID();
    const task = { id, content, isCompleted };

    this.inMemoryTasks.set(id, task);
    this.idsSortedList = [task.id, ...this.idsSortedList];
    this.updateIdsMap();

    return { task };
  }

  deleteTask(taskId: string) {
    if (this.inMemoryTasks.has(taskId)) {
      this.inMemoryTasks.delete(taskId);

      const index = this.idsSortedList.findIndex((id) => id === taskId);
      this.idsSortedList.splice(index, 1);

      this.updateIdsMap();
    }
  }

  updateTask(task: Task) {
    if (this.inMemoryTasks.has(task.id)) {
      this.inMemoryTasks.set(task.id, task);
    }
  }

  getAllTasks() {
    return this.idsSortedList.map((id) => this.inMemoryTasks.get(id)) as Task[];
  }

  getActiveTasks() {
    return this.idsSortedList
      .map((id) => this.inMemoryTasks.get(id))
      .filter((task) => task && !task.isCompleted) as Task[];
  }

  getCompletedTasks() {
    return this.idsSortedList
      .map((id) => this.inMemoryTasks.get(id))
      .filter((task) => task && task?.isCompleted) as Task[];
  }

  reorderTasks(list: string[], filter?: "active" | "completed") {
    if (list.length === this.idsSortedList.length) {
      this.idsSortedList = [...list];
      this.updateIdsMap();
    } else if (filter) {
      const originalTasksOrder =
        filter === "active" ? this.getActiveTasks() : this.getCompletedTasks();

      const originalIndexesOrder = originalTasksOrder.map(
        (task) => this.idsSortedMap[task.id],
      );

      list.forEach((id, index) => {
        this.idsSortedMap[id] = originalIndexesOrder[index];
      });

      this.updateIdsList();
    }
  }
}
