import { Task } from "@/lib/definitions";
import { TodoTask } from "./task";

export function TodoList({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <ul class="bg-white flex flex-col overflow-hidden rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
        {tasks.map((task) => (
          <li class="border-b border-light-lightGrayishBlue px-6 py-4">
            <TodoTask {...task} />
          </li>
        ))}

        <li class="flex justify-between px-6 py-4 text-sm text-light-darkGrayishBlue">
          <span>5 items left</span>

          <button class="transition-colors hover:text-light-veryDarkGrayishBlue">
            Clear completed
          </button>
        </li>
      </ul>
    </div>
  );
}
