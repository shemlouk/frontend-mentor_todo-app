import { Document } from "../components/document";
import { TodoCreateForm } from "../components/todo/create-form";
import { TodoFilter } from "../components/todo/filter";

export function TodosPage() {
  return (
    <Document>
      <body class="flex h-screen w-full flex-col bg-light-veryLightGray px-6 py-12 text-light-veryDarkGrayishBlue">
        <img
          src="/public/bg-mobile-light.jpg"
          alt="background"
          class="fixed left-0 top-0 -z-10 w-full"
        />

        <header class="mb-6 flex items-center justify-between">
          <h1 class="text-white select-none text-3xl font-bold">T O D O</h1>
          <img src="/public/icon-moon.svg" alt="moon icon" class="h-6 w-6" />
        </header>

        <main
          hx-target="#todo-list-placeholder"
          hx-swap="outerHTML"
          hx-trigger="load"
          hx-get="/tasks"
          class="flex h-[90%] flex-col gap-4"
        >
          <TodoCreateForm />
          <div id="todo-list-placeholder" />
          <TodoFilter />
        </main>
      </body>
    </Document>
  );
}
