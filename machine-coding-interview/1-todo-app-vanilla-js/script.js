document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".todo-container__todo-form");
  const add_btn = document.querySelector(".todo-container__add-btn");
  const form_input = document.querySelector(".todo-container__input");
  const todo_list = document.querySelector(".todo-container__todo-list");
  let edit_mode = false;
  let edit_item = null;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form_input.value !== "") {
      if (edit_mode) {
        edit_item.firstChild.innerText = form_input.value;
        edit_mode = false;
        edit_item = null;
      } else {
        const todo_value = form_input.value.trim();
        addTodo(todo_value);
      }
      form_input.value = "";
      add_btn.innerText = "Add";
    } else {
      alert("Please fill a valid task!");
    }
  });

  todo_list.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const todo_item = target.parentNode;
      if (target.textContent === `✏`) {
        edit_mode = true;
        form_input.value = todo_item.firstChild.innerText;
        form_input.focus();
        add_btn.innerText = "Edit";
        edit_item = todo_item;
      } else if (target.textContent === `❌`) {
        todo_item.remove();
      }
    }
  });

  function addTodo(todo_value) {
    const todo_element = document.createElement("li");
    const edit_btn = document.createElement("button");
    const remove_btn = document.createElement("button");

    todo_element.innerHTML = `<span>${todo_value}</span>`;
    edit_btn.innerText = `✏`;
    remove_btn.innerText = `❌`;
    todo_element.appendChild(edit_btn);
    todo_element.appendChild(remove_btn);

    todo_list.appendChild(todo_element);
  }
});
