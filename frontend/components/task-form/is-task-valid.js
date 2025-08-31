export function isTaskValid(task = {}) {
  return !Object.values(task).some((item) => item.trim() === "");
}