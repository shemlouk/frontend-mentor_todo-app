import { Document } from "../components/document";
import { TodoCreateForm } from "../components/todo/create-form";
import { TodoFilter } from "../components/todo/filter";

export function TodosPage() {
  return (
    <Document>
      <body
        un-cloak
        hx-boost="true"
        class="group flex h-screen w-full flex-col bg-light-veryLightGray px-6 py-12 text-light-veryDarkGrayishBlue transition-colors dark:bg-dark-veryDarkBlue dark:text-dark-lightGrayishBlue"
      >
        <figure class="fixed left-0 top-0 -z-10 w-full">
          <img
            src="/public/bg-mobile-light.jpg"
            alt="background"
            class="w-full group-data-[dark]:hidden"
          />
          <img
            src="/public/bg-mobile-dark.jpg"
            alt="background"
            class="hidden w-full group-data-[dark]:block"
          />
        </figure>

        <header class="mb-6 flex items-center justify-between">
          <h1 class="text-white select-none text-3xl font-bold">T O D O</h1>

          <button _="on click toggle @data-dark on the closest parent <body/>">
            <img
              _="on click add .dark to the closest parent <html/>"
              src="/public/icon-moon.svg"
              alt="moon icon"
              class="h-6 w-6 group-data-[dark]:hidden"
            />
            <img
              _="on click remove .dark from the closest parent <html/>"
              src="/public/icon-sun.svg"
              alt="sun icon"
              class="hidden h-6 w-6 group-data-[dark]:block"
            />
          </button>
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
