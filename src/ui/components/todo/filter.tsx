export function TodoFilter() {
  return (
    <form
      id="todo-filter"
      _="on submit halt"
      data-selected="all"
      class="bg-white group z-10 flex items-center justify-center gap-6 rounded-md py-3 font-bold text-light-darkGrayishBlue shadow-[0_35px_60px_-15px_rgba(0,0,0,0.08)]"
    >
      <button
        id="all"
        hx-get="/tasks"
        hx-swap="outerHTML"
        hx-target="#todo-list-container"
        _="on click set #todo-filter @data-selected to my @id"
        class="mt-1 transition-colors group-data-[selected=all]:text-brightBlue"
      >
        All
      </button>

      <button
        id="active"
        hx-swap="outerHTML"
        hx-get="/tasks?select=active"
        hx-target="#todo-list-container"
        _="on click set #todo-filter @data-selected to my @id"
        class="mt-1 transition-colors group-data-[selected=active]:text-brightBlue"
      >
        Active
      </button>

      <button
        id="completed"
        hx-swap="outerHTML"
        hx-get="/tasks?select=completed"
        hx-target="#todo-list-container"
        _="on click set #todo-filter @data-selected to my @id"
        class="mt-1 transition-colors group-data-[selected=completed]:text-brightBlue"
      >
        Completed
      </button>
    </form>
  );
}
