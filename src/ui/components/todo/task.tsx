import { type Task } from "@/lib/definitions";
import { text as confirmDeleteTask } from "@/lib/scripts/confirm-delete-task.script.js";
import clsx from "clsx";
import { FormCheckbox } from "../form/checkbox";

export function TodoTask({ id, content, isCompleted }: Task) {
  const componentId = `task-${id}`;

  return (
    <li
      id={componentId}
      data-checked={String(isCompleted)}
      class="group/item border-b border-light-veryLightGrayishBlue px-6 py-4 dark:border-dark-ultraDarkGrayishBlue md:px-8 md:py-5"
    >
      <div class="flex gap-4">
        <FormCheckbox taskId={id} checked={isCompleted} />

        <span
          class={clsx("mt-1 flex-1 font-medium md:text-lg", {
            "text-light-lightGrayishBlue line-through dark:text-dark-veryDarkGrayishBlue":
              isCompleted,
          })}
        >
          {content}
        </span>

        <button
          hx-target={`#${componentId}`}
          hx-delete={`/tasks/${id}`}
          hx-trigger="confirmed"
          hx-swap="outerHTML"
          _={`on click call ${confirmDeleteTask} if result.isConfirmed trigger confirmed`}
          class="transition-all md:opacity-0 md:group-hover/item:opacity-100"
        >
          <img src="/public/icon-cross.svg" alt="delete icon" class="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
