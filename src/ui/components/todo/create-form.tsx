import { FormCheckbox } from "../form/checkbox";

export function TodoCreateForm() {
  return (
    <form
      action="#"
      class="bg-white flex items-center gap-4 rounded-md px-6 py-3"
    >
      <FormCheckbox name="isCompleted" />

      <input
        name="content"
        required
        type="text"
        placeholder="Create a new todo..."
        class="mt-1 flex-1 outline-none"
      />
    </form>
  );
}
