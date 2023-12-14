import { FormCheckbox } from "../form/checkbox";

export function TodoCreateForm() {
  return (
    <form
      hx-post="/tasks"
      hx-swap="afterbegin"
      hx-target="#todo-list"
      _="on submit target.reset()"
      class="bg-white flex items-center gap-4 rounded-md px-6 py-3 transition-colors dark:bg-dark-veryDarkDesaturatedBlue md:px-8 md:py-4"
      data-loading-states
      data-loading-target="#content"
    >
      <FormCheckbox name="isCompleted" />

      <input
        required
        type="text"
        id="content"
        name="content"
        data-loading-class="hidden"
        class="bg-transparent mt-1 flex-1 outline-none md:text-lg"
        placeholder="Create a new todo..."
      />

      <span
        data-loading
        class="mt-1 text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlueHover md:text-lg"
      >
        Creating...
      </span>
    </form>
  );
}
