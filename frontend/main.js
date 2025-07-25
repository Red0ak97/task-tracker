import { getTasks, removeTask, editTask } from "./api.js";

// начальный рендер
getTasks().then(renderTasks);

function makeTaskItem(task) {
  const { title, description, status, id } = task;

  const taskElement = document.createElement("li");
  taskElement.classList.add("task-item");

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = title;
  taskElement.append(taskTitle);

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task-description");
  taskDescription.textContent = description;
  taskElement.append(taskDescription);

  const taskStatus = document.createElement("h5");
  taskStatus.classList.add("task-status");
  taskStatus.textContent = status;
  taskElement.append(taskStatus);

  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");

  const removeButton = document.createElement("button");
  removeButton.classList.add("task-remove-button");
  removeButton.textContent = "remove button";
  taskActions.append(removeButton);

  removeButton.addEventListener("click", () => {
    removeTask(id)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("task-edit-button");
  editButton.textContent = "edit button";
  taskActions.append(editButton);

  editButton.addEventListener("click", () => {
    console.log("Task Prev Title", task.title);
    // открываем форму редактирования задачи
    // пихаем в форму значения кнкретной задачи
    // вешаем обработчики событий на элементы формы
    // вешаем обработчик события на сохранение формы -> отправляем запрос PUT
    // добавляем кнопку отмены

    task.title = "aasdfasdfadsfadsfasfdsfds!";

    editTask(task)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  });

  taskElement.append(taskActions);
  return taskElement;
}

function renderTasks(tasks) {
  const tasksContainer = document.querySelector(".tasks");

  // очищаем элемент
  tasksContainer.innerHTML = "";

  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  tasks.forEach((task) => {
    const nextTaskElement = makeTaskItem(task);
    taskList.append(nextTaskElement);
  });

  tasksContainer.append(taskList);
}