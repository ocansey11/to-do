var today = new Date().toISOString().split("T")[0];

function returnTime() {
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes + 4 : minutes + 4;
  var timeString = hours + ":" + minutes;
  return timeString;
}

currentTime = returnTime();
var storage;
if (localStorage.getItem("tasks")) {
  var storage = JSON.parse(localStorage.getItem("tasks"));
} else {
  storage = [
    {
      task: "add a task",
      date: today,
      time: "",
      selection: "urgent",
    },
  ];
}

window.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector(".add_btn");
  const cancelBtn = document.getElementById("cancel_todo");
  const saveBtn = document.getElementById("save_todo");
  const dialog = document.getElementById("todo_card");
  const dateInput = document.getElementById("pop_up-date");
  const timeInput = document.getElementById("appt");
  const selection = document.getElementById("selection");
  const task = document.getElementById("task");
  const timeline = document.querySelector(".todo_list");
  const reload = document.getElementById("reload");

  // FORM HANDLING.
  // Date Handling
  var today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  //Time Handling. Maybe this should apply to whatever date. But for other dates than today, maybe the min time should be 6 : 00. or whenever the user wakes up from bed
  function timeValidity() {
    if (dateInput.value == today) {
      timeInput.setAttribute("min", currentTime);
    }
  }

  // MODAL AND FORM INTERACTIONS
  //Add Button, Modal Handling
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

  // EVENT LISTENERS
  // Striking line when radio is clicked
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

  // Time handling
  dateInput.addEventListener("change", function () {
    timeValidity();
    console.log(timeInput);
  });

  // Form submission
  saveBtn.addEventListener("submit", function () {
    var taskValue = task.value;
    var selectionValue = selection.value;
    var dateValue = dateInput.value;
    var timeValue = timeInput.value;

    var newTask = {
      task: taskValue,
      date: dateValue,
      time: timeValue,
      selection: selectionValue,
    };

    storage.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storage));

    // refreshingTl();

    // reload.click();
  });

  // reload.addEventListener("click", () => {
  //   storage.sort((a, b) => a.date - b.date);
  //   storage.sort((a, b) => a.time - b.time);
  //   debugger;
  //   refreshingTl();
  // });

  function refreshingTl() {
    //Appending the items from localstorage unto the tl
    for (i = 0; i < storage.length; i++) {
      timeline.innerHTML = "";
      timeline.innerHTML += ` <li class="todo_list-item">
      <input type="radio" id="${i}" class="radio" /> ${storage[i].task}
      <span>${storage[i].time}  </span>
      <span>${storage[i].date}  </span>
      <span>${storage[i].selection}  </span>
    </li>`;
    }
  }

  refreshingTl();
});
