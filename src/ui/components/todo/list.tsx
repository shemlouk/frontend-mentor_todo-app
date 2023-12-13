import { Task } from "@/lib/definitions";
import { text as confirmClearCompletedTasks } from "@/lib/scripts/confirm-clear-completed-tasks.script.js";
import { text as updateUncheckedTasksCount } from "@/lib/scripts/update-unchecked-tasks-count.script.js";
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
      class="bg-white relative flex h-full flex-col overflow-hidden rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] transition-colors dark:bg-dark-veryDarkDesaturatedBlue"
    >
      <ul
        id="todo-list"
        class="no-scrollbars h-full overflow-y-scroll pb-[52px] md:pb-[68px]"
        _={`on mutation of childList js ${updateUncheckedTasksCount} end`}
      >
        {tasks.map((task) => (
          <TodoTask {...task} />
        ))}
      </ul>

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
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
