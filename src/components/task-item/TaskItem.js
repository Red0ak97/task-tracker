export class TaskItem {
  constructor({ task, onDelete, onEdit }) {
    this.task = task;
    this.elem = null;

    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.localDelete = this.localDelete.bind(this);
    this.localEdit = this.localEdit.bind(this);
  }

  render() {
    const { title, description, status, id } = this.task;
    this.elem = document.createElement("li");
    this.elem.classList.add("task-item");

    this.elem.innerHTML = `
        <h3 class="task-title">${title}</h3>
    
        <p class="task-description">${description}</p>

        <h5 class="task-status">${status}<h5>

        <div class="task-actions">
            <button class="button task-delete-button">Delete Task</button>
            <button class="button task-edit-button">Edit Task</button>
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

    const deleteTaskBtn = this.elem.querySelector(".task-delete-button");
    const editTaskBtn = this.elem.querySelector(".task-edit-button");
    deleteTaskBtn.addEventListener("click", this.localDelete);
    editTaskBtn.addEventListener("click", this.localEdit);
  }

  localDelete() {
    this.onDelete(this.task.id);
  }

  localEdit() {
    this.onEdit(this.task);
  }

  destroy() {
    if (this.elem) {
      const deleteTaskBtn = this.elem.querySelector(".task-delete-button");
      const editTaskBtn = this.elem.querySelector(".task-edit-button");
      deleteTaskBtn.removeEventListener("click", this.localDelete);
      editTaskBtn.removeEventListener("click", this.localEdit);
    }
  }
}
