import { type Task } from "@/lib/definitions";
import { text as confirmDeleteTask } from "@/lib/scripts/confirm-delete-task.script.js";
import clsx from "clsx";
import { FormCheckbox } from "../form/checkbox";

export function TodoTask({ id, content, isCompleted }: Task) {
  const componentId = `task-${id}`;

  return (
    <li
      id={componentId}
      data-loading-states
      data-checked={String(isCompleted)}
      class="group/item select-none border-b border-light-veryLightGrayishBlue transition-colors dark:border-dark-ultraDarkGrayishBlue dark:bg-dark-veryDarkDesaturatedBlue"
    >
      <input name={id} type="text" class="hidden" />

      <div class="flex gap-4 px-6 py-4  transition-colors md:px-8 md:py-5">
        <FormCheckbox taskId={id} checked={isCompleted} />

        <span
          class={clsx("flex flex-1 items-center gap-4 font-medium md:text-lg", {
            "text-light-lightGrayishBlue line-through dark:text-dark-veryDarkGrayishBlue":
              isCompleted,
          })}
        >
          <span
            data-loading="flex"
            class="relative flex h-2 w-2"
            data-loading-path={`/tasks/${id}`}
          >
            <span class="bg-red-500 absolute h-full w-full animate-ping rounded-full opacity-75" />
            <span class="bg-red-500 relative inline-flex h-2 w-2 rounded-full" />
          </span>

          <span
            data-loading="flex"
            class="relative flex h-2 w-2"
            data-loading-path={`/tasks/${id}/complete`}
          >
            <span class="bg-blue-500 absolute h-full w-full animate-ping rounded-full opacity-75"></span>
            <span class="bg-blue-500 relative inline-flex h-2 w-2 rounded-full"></span>
          </span>

          {content}
        </span>

        <button
          hx-target={`#${componentId}`}
          hx-delete={`/tasks/${id}`}
          hx-trigger="confirmed"
          hx-swap="outerHTML"
          _={`on click call ${confirmDeleteTask} if result.isConfirmed trigger confirmed`}
          class="transition-all disabled:cursor-not-allowed md:opacity-0 md:group-hover/item:opacity-100"
          data-loading-disable
        >
          <img src="/public/icon-cross.svg" alt="delete icon" class="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
