const DEFAULT_PAGE_PATH = "/";

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.handle = this.handle.bind(this);
    window.onpopstate = history.onpushstate = this.handle;
    this.handle(); // render default page right away
  }

  handle(event) {
    const path = event?.state?.route ?? location?.pathname ?? DEFAULT_PAGE_PATH;

    const route = this.routes[path];

    if (typeof route === "function") {
      route();
    } else {
      this.routes.notFound();
    }
  }
}
