import { getTasks, addTask, editTask, isTaskValid } from "./api.js";
import { createTaskForm } from "./components/index.js"
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
  removeButton.classList.add("button", "task-remove-button");
  removeButton.textContent = "remove task";
  taskActions.append(removeButton);

  removeButton.addEventListener("click", () => {
    removeTask(id)
      .then(() => getTasks().then(renderTasks))
      .catch(console.log);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("button", "task-edit-button");
  editButton.textContent = "edit task";
  taskActions.append(editButton);

editButton.addEventListener("click", () => {
  const handleSubmitEditTask = (formData, taskId) => { // Изменено
    const updatedTask = { ...formData, id: taskId }; // Собираем объект
    editTask(updatedTask)
      .then(() => {
        const form = document.querySelector(".task-form"); // Ищем форму по классу
        if(form) form.remove();
        getTasks().then(renderTasks);
      })
      .catch(console.log);
  };

  const editFormElem = createTaskForm(task, handleSubmitEditTask, () => { // Изменено
      const form = document.querySelector(".task-form"); // Ищем форму по классу
      if(form) form.remove();
  });
  document.body.append(editFormElem);
});

    // TODO:
    // при открытии формы -> фокус на первом поле
    // добавить валидацию на пустые поля (title)
    // открывать возможность отправить запрос на сервер только если данные менялись (дизейл кнопки сохранить)
    // добавить компонент модального окна с overlay ....
  

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

const addNewTaskButton = document.querySelector(".task-add-button");

addNewTaskButton.addEventListener("click", () => {
  const handleSubmitAddTask = (formData, taskId) => { 
    const newTask = formData; 
    const isValid = isTaskValid(newTask);

    if (!isValid) {
      const form = document.querySelector(".task-form");
      const errElem = form.querySelector(".form-error");
      errElem.innerHTML = "";
      errElem.textContent = "Форма невалидна, заполните все поля и повторите.";
      errElem.hidden = false;

      return;
    } else {
      addTask(newTask)
        .then(() => {
          const form = document.querySelector(".task-form");
          if(form) form.remove();
          getTasks().then(renderTasks);
        })
        .catch(console.log);
    }
  };

  const addFormElem = createTaskForm(null, handleSubmitAddTask, () => { // Изменено
      const form = document.querySelector(".task-form");
      if(form) form.remove();
  });
  document.body.append(addFormElem);
});

