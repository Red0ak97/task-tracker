import { TasksPage } from "./tasks-page.js";
import { UsersPage } from "./users-page.js";
import { Router } from "../core/index.js";
import { NotFoundPage } from "./not-found-page.js";
import { NavBar } from "../components/index.js";

// render navigation for all the pages
new NavBar({ container: document.body }).render();

const container = document.querySelector("#app");
const routerConfig = {
  "/": () => new TasksPage({ container }).render(),
  "/users": () => new UsersPage({ container }).render(),
  notFound: () => new NotFoundPage({ container }).render(),
};

new Router(routerConfig);
