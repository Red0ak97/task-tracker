const BASE_URL = "http://localhost:3000";

export function getTasks() {
  return fetch(`${BASE_URL}/tasks`)
    .then((response) => {
      return response.json();
    })
    .then((parsed) => {
      return parsed;
    })
    .catch((err) => console.error(err));
}

export function removeTask(taskId) {
  return fetch(`${BASE_URL}/tasks/${taskId}`, { method: "DELETE" }).then(
    (response) => {
      if (+response.status === 200) {
        return true;
      } else {
        throw new Error("Ошибка при удалении задачи. Попрбуйте снова");
      }
    }
  );
}

export function editTask(updatedTask) {
  const { id } = updatedTask;
  const body = JSON.stringify(updatedTask);
  return fetch(`${BASE_URL}/tasks/${id}`, { method: "PUT", body }).then(
    (response) => {
      if (String(response.status).startsWith("2")) {
        return true;
      } else {
        throw new Error("Ошибка при редактировании задачи. Попрбуйте снова");
      }
    }
  );
}

export function addTask(newTask) {
  const body = JSON.stringify(newTask);

  return fetch(`${BASE_URL}/tasks`, { method: "POST", body }).then((res) => {
    if (String(res.status).startsWith("2")) {
      return true;
    } else {
      throw new Error("Ошибка при редактировании задачи. Попрбуйте снова");
    }
  });
}