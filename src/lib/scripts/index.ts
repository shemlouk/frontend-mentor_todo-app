const updateUncheckedTasksCount = await Bun.file(
  new URL("./update-unchecked-tasks-count.js", import.meta.url),
).text();

const confirmDeleteTask = await Bun.file(
  new URL("./confirm-delete-task.js", import.meta.url),
).text();

const confirmClearCompletedTasks = await Bun.file(
  new URL("./confirm-clear-completed-tasks.js", import.meta.url),
).text();

export {
  confirmClearCompletedTasks,
  confirmDeleteTask,
  updateUncheckedTasksCount
};

