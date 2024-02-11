const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length > 0) {
  todos.forEach(todo => addTodoElement(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = input.value.trim();

  if (todoText) {
    const newTodo = { text: todoText, completed: false };
    todos.push(newTodo);
    addTodoElement(newTodo);
    updateLocalStorage();
    input.value = '';
  }
});

function addTodoElement(todo) {
  const todoEl = document.createElement('li');
  todoEl.innerHTML = `
    <span>${todo.text}</span>
    <button onclick="toggleCompleted(${todos.indexOf(todo)})">Toggle</button>
    <button onclick="editTodo(${todos.indexOf(todo)})">Edit</button>
    <button onclick="deleteTodo(${todos.indexOf(todo)})">Delete</button>
  `;

  if (todo.completed) {
    todoEl.classList.add('completed');
  }

  todoEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    editTodoPrompt(todo, todoEl);
  });

  todosUL.appendChild(todoEl);
}

function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  todosUL.innerHTML = '';
  todos.forEach(todo => addTodoElement(todo));
  updateLocalStorage();
}

function editTodoPrompt(todo, todoEl) {
  const newTodoText = prompt('Edit task:', todo.text);
  if (newTodoText !== null) {
    todo.text = newTodoText;
    todoEl.querySelector('span').innerText = newTodoText;
    updateLocalStorage();
  }
}

function editTodo(index) {
  const todo = todos[index];
  const todoEl = todosUL.childNodes[index];

  editTodoPrompt(todo, todoEl);
}

function deleteTodo(index) {
  todos.splice(index, 1);
  todosUL.innerHTML = '';
  todos.forEach(todo => addTodoElement(todo));
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
