const todoList = document.querySelector("#todo-list");

let uncheckeds = 0;

for (const todo of todoList.children) {
  const isChecked = todo.getAttribute("data-checked");
  if (isChecked === "false") uncheckeds++;
}

const uncheckedCount = document.querySelector("#unchecked-count");
uncheckedCount.innerHTML = uncheckeds;
