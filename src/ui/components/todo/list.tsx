import { Task } from "@/lib/definitions";
import { updateUncheckedTasksCount } from "@/lib/scripts";
import { TodoTask } from "./task";

export function TodoList({ tasks }: { tasks: Task[] }) {
  const itemsLeftQuantity = tasks.reduce(
    (t, c) => (!c.isCompleted ? ++t : t),
    0,
  );

  return (
    <div class="bg-white flex flex-col overflow-hidden rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
      <ul
        id="todo-list"
        _={`on mutation of childList js ${updateUncheckedTasksCount} end`}
      >
        {tasks.map((task) => (
          <TodoTask {...task} />
        ))}
      </ul>

      <div class="flex justify-between px-6 py-4 text-sm text-light-darkGrayishBlue">
        <span>
          <span id="unchecked-count">{itemsLeftQuantity}</span> items left
        </span>

        <button class="transition-colors hover:text-light-veryDarkGrayishBlue">
          Clear completed
        </button>
      </div>
    </div>
  );
}
