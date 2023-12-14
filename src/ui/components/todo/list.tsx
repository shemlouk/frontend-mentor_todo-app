import { text as confirmClearCompletedTasks } from "@/lib/scripts/confirm-clear-completed-tasks.script.js";
import { text as updateUncheckedTasksCount } from "@/lib/scripts/update-unchecked-tasks-count.script.js";

import { Task } from "@/lib/definitions";
import { LoadingAnimation } from "../loading-animation";
import { TodoFilter } from "./filter";
import { TodoTask } from "./task";

export function TodoList({
  tasks,
  selected,
}: {
  tasks: Task[];
  selected?: string;
}) {
  const uncheckedCount = tasks.reduce((t, c) => (!c.isCompleted ? ++t : t), 0);

  return (
    <div
      id="todo-list-container"
      class="bg-white relative flex flex-col overflow-hidden rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
      data-loading-states
    >
      <form
        hx-post={`/tasks/sort?select=${selected}`}
        hx-target="#todo-list-container"
        hx-swap="outerHTML"
        hx-trigger="end"
        _="on submit halt"
      >
        <ul
          id="todo-list"
          class="sortable no-scrollbars h-full overflow-y-scroll pb-[52px] md:pb-[68px]"
          _={`on mutation of childList js ${updateUncheckedTasksCount} end`}
          data-loading-states
        >
          {tasks.map((task) => (
            <TodoTask {...task} />
          ))}
        </ul>

        <div
          class="bg-white absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
          data-loading-path="/tasks"
          data-loading="flex"
        >
          <LoadingAnimation />
        </div>

        <div
          class="bg-white absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
          data-loading-path="/tasks?select=active"
          data-loading="flex"
        >
          <LoadingAnimation />
        </div>

        <div
          class="bg-white absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
          data-loading-path="/tasks?select=completed"
          data-loading="flex"
        >
          <LoadingAnimation />
        </div>

        <div
          class="bg-white absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
          data-loading-path="/tasks/completed"
          data-loading="flex"
        >
          <LoadingAnimation />
        </div>
      </form>

      <div class="bg-white absolute bottom-0 left-0 flex w-full justify-between border-t border-light-lightGrayishBlue px-6 py-4 text-sm text-light-darkGrayishBlue transition-colors dark:border-dark-veryDarkGrayishBlue dark:bg-dark-veryDarkDesaturatedBlue md:px-8 md:py-5 md:text-lg">
        <span>
          <span id="unchecked-count">{uncheckedCount}</span> items left
        </span>

        <div class="hidden md:block">
          <TodoFilter selected={selected} />
        </div>

        <button
          hx-target="#todo-list-container"
          hx-delete="/tasks/completed"
          hx-trigger="confirmed"
          hx-swap="outerHTML"
          _={`on click call ${confirmClearCompletedTasks} if result.isConfirmed trigger confirmed`}
          class="transition-colors hover:text-light-veryDarkGrayishBlue dark:hover:text-dark-lightGrayishBlueHover"
          data-loading-disable
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
