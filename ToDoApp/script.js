const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filters button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    if(filter === 'completed' && !task.completed) return;
    if(filter === 'pending' && task.completed) return;
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if(text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveAndRender();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index,1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if(e.key==='Enter') addTask(); });
filters.forEach(btn => btn.addEventListener('click', () => renderTasks(btn.dataset.filter)));

renderTasks();
