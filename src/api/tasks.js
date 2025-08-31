import { BASE_URL } from "./constants.js";

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  const parsed = await response.json();
  return parsed;
}

export async function removeTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (String(response.status).startsWith("2")) {
    return true;
  }

  throw new Error("Ошибка при удалении задачи. Попрбуйте снова");
}

export async function editTask(updatedTask) {
  const { id } = updatedTask;
  const body = JSON.stringify(updatedTask);
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    body,
  });

  if (String(response.status).startsWith("2")) {
    return true;
  }

  throw new Error("Ошибка при редактировании задачи. Попрбуйте снова");
}

export async function addTask(newTask) {
  const body = JSON.stringify(newTask);

  const response = await fetch(`${BASE_URL}/tasks`, { method: "POST", body });
  if (String(response.status).startsWith("2")) {
    return true;
  }

  throw new Error("Ошибка при редактировании задачи. Попрбуйте снова");
}
