import { Task } from "@/lib/definitions";
import { text as confirmClearCompletedTasks } from "@/lib/scripts/confirm-clear-completed-tasks.script.js";
import { text as updateUncheckedTasksCount } from "@/lib/scripts/update-unchecked-tasks-count.script.js";
import { TodoTask } from "./task";

export function TodoList({ tasks }: { tasks: Task[] }) {
  const uncheckedCount = tasks.reduce((t, c) => (!c.isCompleted ? ++t : t), 0);

  return (
    <div
      id="todo-list-container"
      class="bg-white relative flex h-full flex-col overflow-hidden rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)]"
    >
      <ul
        id="todo-list"
        class="h-full overflow-y-scroll pb-16"
        _={`on mutation of childList js ${updateUncheckedTasksCount} end`}
      >
        {tasks.map((task) => (
          <TodoTask {...task} />
        ))}
      </ul>

      <div class="bg-white absolute bottom-0 left-0 flex w-full justify-between border-t border-light-lightGrayishBlue px-6 py-4 text-sm text-light-darkGrayishBlue">
        <span>
          <span id="unchecked-count">{uncheckedCount}</span> items left
        </span>

        <button
          hx-target="#todo-list-container"
          hx-delete="/tasks/completed"
          hx-trigger="confirmed"
          hx-swap="outerHTML"
          _={`on click call ${confirmClearCompletedTasks} if result.isConfirmed trigger confirmed`}
          class="transition-colors hover:text-light-veryDarkGrayishBlue"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
