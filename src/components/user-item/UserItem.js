export class UserItem {
    constructor({user}) {
        this.user = user;
        this.elem = null;
    }
      render() {
    const { name, age, role, avatar, id } = this.user;
    this.elem = document.createElement("li");
    this.elem.classList.add("user-item");

    this.elem.innerHTML = `
        <h3 class="user-title">${name}</h3>
    
        <p class="user-description">${age}</p>

        <h5 class="user-status">${role}<h5>

        <div>
        avatar :
        <img src="${avatar}" width="100" height="100"/>
        </div>

    `;


    return this.elem;
}
}