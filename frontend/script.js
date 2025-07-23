// запросить данные с сервера

function getDataAndRender() {
  fetch("http://localhost:3000/tasks")
    .then((response) => {
      return response.json();
    })
    .then((parsed) => {
      console.log("PARSED", parsed);
      // отрисовать данные (parsed) на странице
      renderTasks(parsed);
    })
    .catch((err) => console.error(err));
}

// начальный рендер
getDataAndRender();

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

  const removeButton = document.createElement("button");
  removeButton.classList.add("task-remove-button");
  removeButton.textContent = "remove button";
  taskElement.append(removeButton);

  removeButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (+response.status === 200) {
          console.log("успешно удалено!");
          getDataAndRender();
        }
      }
    );
  });

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