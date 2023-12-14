import { randomUUID } from "crypto";

export function TodoFilter({ selected = "all" }: { selected?: string }) {
  const componentId = "todo-filter-" + randomUUID();

  return (
    <form
      id={componentId}
      _="on submit halt"
      data-selected={selected}
      class="group flex items-center gap-6 font-bold text-light-darkGrayishBlue transition-colors"
    >
      <button
        id="all"
        hx-get="/tasks"
        hx-swap="outerHTML"
        hx-target="#todo-list-container"
        _={`on click set #${componentId} @data-selected to my @id`}
        class="transition-colors disabled:cursor-not-allowed group-data-[selected=all]:text-brightBlue md:hover:text-light-veryDarkGrayishBlue dark:md:hover:text-dark-lightGrayishBlueHover"
        data-loading-disable
      >
        All
      </button>

      <button
        id="active"
        hx-swap="outerHTML"
        hx-get="/tasks?select=active"
        hx-target="#todo-list-container"
        _={`on click set #${componentId} @data-selected to my @id`}
        class="transition-colors disabled:cursor-not-allowed group-data-[selected=active]:text-brightBlue md:hover:text-light-veryDarkGrayishBlue dark:md:hover:text-dark-lightGrayishBlueHover"
        data-loading-disable
      >
        Active
      </button>

      <button
        id="completed"
        hx-swap="outerHTML"
        hx-get="/tasks?select=completed"
        hx-target="#todo-list-container"
        _={`on click set #${componentId} @data-selected to my @id`}
        class="transition-colors disabled:cursor-not-allowed group-data-[selected=completed]:text-brightBlue md:hover:text-light-veryDarkGrayishBlue dark:md:hover:text-dark-lightGrayishBlueHover"
        data-loading-disable
      >
        Completed
      </button>
    </form>
  );
}
