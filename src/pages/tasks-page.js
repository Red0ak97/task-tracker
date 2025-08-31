import { getTasks, removeTask, editTask, addTask } from "../api/tasks.js";
import { TaskForm, TaskItem } from "../components/index.js";

export class TasksPage {
  constructor({ container }) {
    this.container = container;
    this.tasksElems = [];
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }

  async render() {
    this.container.innerHTML = `
        <h1 id="main_title">Task List</h1>
        <button class="button task-add-button">Add Task</button>
        <div class="tasks">
          <ul class="task-list"></ul>
        </div>
    `;

    const tasks = await getTasks();
    this.renderTasks(tasks);
    this.bindEvents();
  }

  renderTasks(tasks) {
    if (!Array.isArray(tasks)) {
      throw new Error("tasks must be an array type");
    }

    this.tasksElems.forEach((task) => task.destroy());
    this.tasksElems = [];

    const tasksList = this.container.querySelector(".task-list");
    if (!tasksList) {
      throw new Error(
        "No tasks list container element. Create container first."
      );
    }
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
      const nextTask = new TaskItem({
        task,
        onDelete: this.handleDeleteTask,
        onEdit: this.handleEditTask,
      });
      this.tasksElems.push(nextTask);
      tasksList.append(nextTask.render());
    });
  }

  bindEvents() {
    const addNewTaskButton = this.container.querySelector(".task-add-button");
    addNewTaskButton.addEventListener("click", this.handleAddTask);
  }

  handleAddTask() {
    const handleSubmitAddTask = async (newTask) => {
      try {
        await addTask(newTask);
        const tasks = await getTasks();
        this.renderTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    };

    const options = { onSubmit: handleSubmitAddTask };
    document.body.append(new TaskForm(options).render());
  }

  async handleDeleteTask(id) {
    try {
      await removeTask(id);
      const tasks = await getTasks();
      this.renderTasks(tasks);
    } catch (err) {
      console.log(err);
    }
  }

  async handleEditTask(task) {
    const edit = async (updatedTask) => {
      try {
        await editTask(updatedTask);
        const tasks = await getTasks();
        this.renderTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    };

    document.body.append(new TaskForm({ task, onSubmit: edit }).render());
  }

  destroy() {
    if (this.container) {
      const addNewTaskButton = this.container.querySelector(".task-add-button");
      addNewTaskButton.removeEventListener("click", this.handleAddTask);
    }
  }
}
