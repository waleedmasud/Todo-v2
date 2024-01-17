// Get the todo input, todo list, and cached todos from local storage
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
let todos = [];

// Load todos from local storage
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
}

// Handle adding new todos
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const todoItem = {
      id: new Date().getTime(),
      text: todoText,
      completed: false,
    };

    todos.push(todoItem);
    updateLocalStorage();
    renderTodoItem(todoItem);

    todoInput.value = "";
  }
}

// Handle rendering todos
function renderTodos() {
  todos.forEach(renderTodoItem);
}

// Handle rendering individual todo items
function renderTodoItem(todoItem) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const todoTextEl = document.createElement("span");
  const deleteButton = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.checked = todoItem.completed;
  checkbox.addEventListener("change", function () {
    toggleTodoComplete(todoItem.id);
  });

  todoTextEl.textContent = todoItem.text;
  if (todoItem.completed) {
    todoTextEl.classList.add("completed");
  }

  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteTodoItem(todoItem.id);
  });

  li.appendChild(checkbox);
  li.appendChild(todoTextEl);
  li.appendChild(deleteButton);

  todoList.appendChild(li);
}

// Handle toggling todo item completion status
function toggleTodoComplete(id) {
  todos = todos.map((todoItem) => {
    if (todoItem.id === id) {
      return {
        ...todoItem,
        completed: !todoItem.completed,
      };
    }
    return todoItem;
  });

  updateLocalStorage();

  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }

  renderTodos();
}

// Handle deleting todo items
function deleteTodoItem(id) {
  todos = todos.filter((todoItem) => todoItem.id !== id);

  updateLocalStorage();

  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }

  renderTodos();
}

// Update local storage with the current todos
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add event listener to the todo input for adding new todos
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
