import { FormCheckbox } from "../form/checkbox";

export function TodoCreateForm() {
  return (
    <form
      hx-post="/tasks"
      hx-swap="afterbegin"
      hx-target="#todo-list"
      _="on submit target.reset()"
      class="bg-white flex items-center gap-4 rounded-md px-6 py-3 transition-colors dark:bg-dark-veryDarkDesaturatedBlue md:px-8 md:py-4"
    >
      <FormCheckbox name="isCompleted" />

      <input
        required
        type="text"
        name="content"
        class="bg-transparent mt-1 flex-1 outline-none md:text-lg"
        placeholder="Create a new todo..."
      />
    </form>
  );
}
