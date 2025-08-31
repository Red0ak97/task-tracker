import { isTaskValid } from "./is-task-valid.js";

const defaultOptions = { onCancel: () => null };

export class TaskForm {
  constructor(options) {
    const { task, onSubmit, onCancel } = { ...defaultOptions, ...options };
    this.task = task ?? {};
    this.elem = null;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
    this.localSubmit = this.localSubmit.bind(this);
    this.localCancel = this.localCancel.bind(this);
  }

  render() {
    const { title, description, status, id } = this.task;
    this.elem = document.createElement("form");
    this.elem.classList.add("task-form");

    this.elem.innerHTML = `
    <label class="task-form-label">
        Title: <input class="task-form-item" type="text" name="title" value="${
          title ?? ""
        }" />
    </label>

     <div>
        <label class="task-form-label" for="task-description">Description:</label>
        <textarea style="resize: none;" class="task-form-item" name="description" id="task-description" rows="10" cols="50">
            ${description ?? ""}
        </textarea>
     </div>

    <label class="task-form-label">
        Status: <input class="task-form-item" type="text" name="status" value="${
          status ?? ""
        }" />
    </label>

    ${id ? `<input hidden type='text' name='id' value=${id} />` : ""}

    <div class="task-form-actions">
        <button class="submit-task-form-btn" type="submit">Сохранить</button>
        <button class="cancel-task-form-btn" type="button">Отмена</button>
    </div>
  `;

    this.bindEvents();
    return this.elem;
  }

  bindEvents() {
    if (!this.elem) {
      throw new Error(
        "You have to render element first. call render() method."
      );
    }

    const cancelButton = this.elem.querySelector(".cancel-task-form-btn");
    this.elem.addEventListener("submit", this.localSubmit);
    cancelButton.addEventListener("click", this.localCancel);
  }

  localSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.elem);
    const taskObject = Object.fromEntries(formData.entries());
    const isValid = isTaskValid(taskObject);

    if (isValid) {
      this.onSubmit(taskObject); // убедиться что сервер ответил УСПЕХОМ и только потом удалять форму
      this.destroy();
    } else {
      this.elem.classList.add("task-form--error");
    }
  }

  localCancel(event) {
    this.onCancel(event);
    this.destroy();
  }

  destroy() {
    if (this.elem) {
      this.elem.removeEventListener("submit", this.localSubmit);
      const cancelButton = this.elem.querySelector(".cancel-task-form-btn");
      cancelButton.removeEventListener("click", this.localCancel);
      this.elem.remove();
    }
  }
}