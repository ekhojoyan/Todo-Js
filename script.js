class ToDo {
  constructor() {
    this.todosData = [];
    this.input = document.querySelector(".todoInput");
    this.list = document.querySelector(".list");
    this.completed = false;
    this.hideConteiner = document.querySelector(".hideConteiner");
    this.rootModal = document.querySelector("#main-modal");
    this.modal = document.querySelector(".modal");
    this.todoID;
    this.textTodo = document.querySelector(".textTodo");
    this.add = document.querySelector(".addButton");
  }

  addTodo() {
    if (this.input.value == "") {
      this.input.style.borderColor = "red";
      this.textTodo.style.display = "block";
    }

    if (this.input.value.trim()) {
      this.todosData.push({
        id: this.todosData.length,
        title: this.input.value,
        isDeleted: false,
        isChecked: false,
      });

      this.drawTodo();
      this.input.style.borderColor = "#ffcd04";
      this.textTodo.style.display = "none";
    }
  }

  drawTodo() {
    this.list.innerHTML = "";
    this.todosData.forEach((todo, index) => {
      if (this.completed) {
        if (!todo.isChecked) {
          this.list.innerHTML += `
                    <div class="todo" id="${index}">
                    <div class="checkBox" onclick="todo.isDone(event.target)">
                    </div>
                    <span class="todoSpan">${todo.title}</span>
                    <button class="deleteButton" onclick="todo.ModalDel(event.target)">
                    <img src="./delete.svg" alt="delete">
                    </button>
                    </div>
                    `;
        }
      } else {
        if (todo.isChecked) {
          this.list.innerHTML += `
                    <div class="todo" id="${index}">
                    <img src="./check_box_black_24dp (3) 1.svg" alt="check" onclick="todo.isDone(event.target)">
                    <span class="doneTodo">${todo.title}</span>
                    <button class="deleteButton" onclick="todo.ModalDel(event.target)">
                    <img src="./delete.svg" alt="delete">
                    </button>
                    </div>
                    `;
        } else {
          this.list.innerHTML += `
                    <div class="todo" id="${index}">
                    <div class="checkBox" onclick="todo.isDone(event.target)">
                    </div>
                    <span class="todoSpan">${todo.title}</span>
                    <button class="deleteButton" onclick="todo.ModalDel(event.target)">
                    <img src="./delete.svg" alt="delete">
                    </button>
                    </div>
                    `;
        }
      }
    });
    this.input.value = "";
  }

  deleteTodo(target) {
    console.log(this.todoID.parentNode.parentNode);
    this.todosData[this.todoID.parentNode.parentNode.id].isDeleted = true;
    this.todosData = this.todosData.filter((todo) => {
      return !todo.isDeleted;
    });
    this.drawTodo();
  }
  ModalDel(todo) {
    this.todoID = todo;
    this.rootModal.style.display = "flex";
    this.modal.style.display = "block";
  }
  yesButton() {
    this.modal.style.display = "none";
    this.rootModal.style.display = "none";
    this.deleteTodo();
  }
  noButton() {
    this.modal.style.display = "none";
    this.rootModal.style.display = "none";
    this.drawTodo();
  }

  isDone(target) {
    this.todosData[target.parentNode.id].isChecked =
      !this.todosData[target.parentNode.id].isChecked;
    this.drawTodo();
  }

  hideCompleted() {
    if (!this.completed) {
      this.hideConteiner.innerHTML = `
                <img src="./check_box_black_24dp (3) 1.svg" alt="check" onclick="todo.hideCompleted()">
                <span onclick="todo.hideCompleted()">Hide completed</span>
            `;
    } else {
      this.hideConteiner.innerHTML = `
                <div class="hideCheckbox" onclick="todo.hideCompleted()"></div>
                <span onclick="todo.hideCompleted()">Hide completed</span>
            `;
    }
    this.completed = !this.completed;
    this.drawTodo();
  }
}

const todo = new ToDo();

document.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    todo.addTodo();
  }
});
