const updateUncheckedTasksCount = await Bun.file(
  new URL("./update-unchecked-tasks-count.js", import.meta.url),
).text();

export { updateUncheckedTasksCount };
