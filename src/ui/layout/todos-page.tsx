import { Document } from "../components/document";
import { TodoCreateForm } from "../components/todo/create-form";
import { TodoFilter } from "../components/todo/filter";

export function TodosPage() {
  return (
    <Document>
      <body
        un-cloak
        hx-boost="true"
        class="group flex h-screen w-full flex-col gap-6 bg-light-veryLightGray px-6 py-12 text-light-veryDarkGrayishBlue transition-colors dark:bg-dark-veryDarkBlue dark:text-dark-lightGrayishBlue md:items-center md:gap-10"
      >
        <figure class="fixed left-0 top-0 -z-10 w-full">
          <img
            src="/public/bg-mobile-light.jpg"
            alt="background"
            class="w-full group-data-[dark]:hidden md:hidden"
          />
          <img
            src="/public/bg-mobile-dark.jpg"
            alt="background"
            class="hidden w-full group-data-[dark]:block md:hidden md:group-data-[dark]:hidden"
          />
          <img
            src="/public/bg-desktop-light.jpg"
            alt="background"
            class="hidden w-full group-data-[dark]:hidden md:block"
          />
          <img
            src="/public/bg-desktop-dark.jpg"
            alt="background"
            class="hidden w-full md:group-data-[dark]:block"
          />
        </figure>

        <header class="flex items-center justify-between md:w-full md:max-w-screen-sm">
          <h1 class="text-white select-none text-3xl font-bold md:text-4xl">
            T O D O
          </h1>

          <button _="on click toggle @data-dark on the closest parent <body/>">
            <img
              _="on click add .dark to the closest parent <html/>"
              src="/public/icon-moon.svg"
              alt="moon icon"
              class="h-6 w-6 transition-all hover:scale-110 group-data-[dark]:hidden md:h-7 md:w-7"
            />
            <img
              _="on click remove .dark from the closest parent <html/>"
              src="/public/icon-sun.svg"
              alt="sun icon"
              class="hidden h-6 w-6 transition-all hover:scale-110 group-data-[dark]:block md:h-7 md:w-7"
            />
          </button>
        </header>

        <main
          hx-target="#todo-list-placeholder"
          hx-swap="outerHTML"
          hx-trigger="load"
          hx-get="/tasks"
          class="flex max-h-[80%] flex-col gap-4 md:w-full md:max-w-screen-sm md:gap-6"
        >
          <TodoCreateForm />

          <div id="todo-list-placeholder" />

          <div class="bg-white z-10 flex items-center justify-center rounded-md py-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.08)] transition-colors dark:bg-dark-veryDarkDesaturatedBlue md:hidden">
            <TodoFilter />
          </div>
        </main>

        <span class="text-center font-semibold text-light-darkGrayishBlue dark:text-dark-veryDarkGrayishBlue">
          Drag and drop to reorder list
        </span>
      </body>
    </Document>
  );
}
