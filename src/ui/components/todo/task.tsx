import { type Task } from "@/lib/definitions";
import clsx from "clsx";
import { FormCheckbox } from "../form/checkbox";

export function TodoTask({ content, isCompleted }: Task) {
  return (
    <div class="flex gap-4">
      <FormCheckbox checked={isCompleted} />

      <span
        class={clsx("flex-1 font-medium", {
          "text-light-lightGrayishBlue line-through": isCompleted,
        })}
      >
        {content}
      </span>

      <button>
        <img src="/public/icon-cross.svg" alt="delete icon" class="h-4 w-4" />
      </button>
    </div>
  );
}
