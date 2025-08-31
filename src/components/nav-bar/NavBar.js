// monkey patch listener to history change
(function (history) {
  var pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate({ state: state });
    }
    // ... whatever else you want to do
    // maybe call onhashchange e.handler
    return pushState.apply(history, arguments);
  };
})(window.history);

export class NavBar {
  constructor({ container }) {
    this.container = container;
    this.elem = null;
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  render() {
    const nav = document.createElement("nav");
    this.elem = nav;
    this.elem.classList.add("navbar");

    this.elem.innerHTML = `
        <a class="nav-bar-item" data-path="/" href="/">Tasks</a>
        <a class="nav-bar-item" data-path="/users"href="/users">Users</a>
    `;

    this.bindEvents();

    this.container.prepend(this.elem);
  }

  bindEvents() {
    const usersLinks = this.elem.querySelectorAll(".nav-bar-item");
    usersLinks.forEach((link) => {
      link.addEventListener("click", this.handleMenuClick);
    });
  }

  handleMenuClick(event) {
    event.preventDefault();
    history.pushState(
      { route: event.target.dataset.path },
      "",
      event.target.dataset.path
    );
  }

  destroy() {
    if (this.elem) {
      const usersLinks = this.elem.querySelectorAll(".nav-bar-item");
      usersLinks.forEach((link) => {
        link.removeEventListener("click", this.handleMenuClick);
      });
    }
  }
}
