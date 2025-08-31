import { BASE_URL } from "./constants.js";

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const parsed = await response.json();
  return parsed;
}
