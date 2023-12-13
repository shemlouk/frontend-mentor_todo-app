export function FormCheckbox({
  name,
  taskId,
  checked,
}: {
  name?: string;
  taskId?: string;
  checked?: boolean;
}) {
  return (
    <div class="group/checkbox relative flex h-fit w-fit rounded-full md:p-[1px] md:hover:bg-gradient-to-br md:hover:from-brightCyan md:hover:to-brightMagenta">
      <input
        hx-patch={taskId && `/tasks/${taskId}/complete`}
        hx-target={`#task-${taskId}`}
        hx-swap="outerHTML"
        type="checkbox"
        {...{ name, checked }}
        class="bg-white peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-light-veryLightGrayishBlue transition-colors checked:border-none checked:bg-gradient-to-br checked:from-brightCyan checked:to-brightMagenta dark:border-dark-ultraDarkGrayishBlue dark:bg-dark-veryDarkDesaturatedBlue md:group-hover/checkbox:border-none"
      />

      <span class="text-white pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100">
        <img src="/public/icon-check.svg" alt="check icon" />
      </span>
    </div>
  );
}
