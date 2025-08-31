export class NotFoundPage {
  constructor({ container }) {
    this.container = container;
  }

  async render() {
    this.container.innerHTML = `
        <h1 id="main_title">404 not found</h1>
    `;
  }
}
