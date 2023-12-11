import { Document } from "../components/document";
import { TodoCreateForm } from "../components/todo/create-form";
import { TodoList } from "../components/todo/list";

const mockList = [
  { id: "1", content: "Jog around the park 3x", isCompleted: false },
  { id: "2", content: "10 minutes meditation", isCompleted: false },
  { id: "3", content: "Readt for 1 hour", isCompleted: true },
  { id: "4", content: "Pick up groceries", isCompleted: false },
];

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
          <h1 class="text-white text-3xl font-bold">T O D O</h1>
          <img src="/public/icon-moon.svg" alt="moon icon" class="h-6 w-6" />
        </header>

        <main class="flex flex-col gap-4">
          <TodoCreateForm />
          <TodoList tasks={mockList} />
        </main>
      </body>
    </Document>
  );
}
