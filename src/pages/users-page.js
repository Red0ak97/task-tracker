import { getUsers } from "../api/users.js";
import { UserItem } from "../components/user-item/UserItem.js";

export class UsersPage {
  constructor({ container }) {
    this.container = container;
    this.usersElems = [];
    this.renderUsers = this.renderUsers.bind(this);
  }

  async render() {
    this.container.innerHTML = `
        <h1 id="main_title">Users List</h1>
        <div class="users">
          <ul class="users-list"></ul>
        </div>
    `;

    const users = await getUsers();
    this.renderUsers(users);
  }

  renderUsers(users) {
    if (!Array.isArray(users)) {
      throw new Error("tasks must be an array type");
    }

    const usersList = this.container.querySelector(".users-list");
      
    
    usersList.innerHTML = "";
    users.forEach((user) => {
      const usersElem = new UserItem({user});
      usersList.append(usersElem.render());
      });
    };
  }
