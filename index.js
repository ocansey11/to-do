var storage = JSON.parse(localStorage.getItem("tasks")) || [
  {
    task: "add a task",
    date: "1999-28-05",
    selection: "urgent",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector(".add_btn");
  const cancelBtn = document.getElementById("cancel_todo");
  const saveBtn = document.getElementById("save_todo");
  // const notifBtn = document.querySelector(".fa-bell");
  const dialog = document.getElementById("todo_card");
  const dateInput = document.getElementById("pop_up-date");
  const selection = document.getElementById("selection");
  const task = document.getElementById("task");

  // Declare saveBtn in the global scope
  window.saveBtn = saveBtn;

  function openCheck(dialog) {
    if (dialog.open) {
      console.log("Dialog open");
    } else {
      console.log("Dialog closed");
    }
  }

  // Update button opens a modal dialog
  addBtn.addEventListener("click", () => {
    dialog.showModal();
    openCheck(dialog);
  });

  // Form cancel button closes the dialog box
  cancelBtn.addEventListener("click", () => {
    dialog.close("animalNotChosen");
    openCheck(dialog);
  });

  // STRIKING LINE THROUGH WHEN RADIO IS CLICKED
  let listCards = document.querySelectorAll(".todo_list-item");

  listCards.forEach((list) => {
    list.addEventListener("change", linethrough);
  });

  function linethrough(event) {
    let listElement = event.currentTarget;
    console.log(listElement);
    listElement.classList.add("strike");

    setTimeout(() => {
      listElement.classList.add("disappear-display");
    }, 500);
  }

  // Event listenres for Button
  saveBtn.addEventListener("click", function () {
    var taskValue = task.value;
    var selectionValue = selection.value;
    var dateValue = dateInput.value;

    var newTask = {
      task: taskValue,
      date: dateValue,
      selection: selectionValue,
    };

    storage.push(newTask);
    console.log(storage);

    localStorage.setItem("tasks", JSON.stringify(storage));
  });
  console.log(storage);
});
