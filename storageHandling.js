// import { saveBtn, selection, dateInput, task } from "./index";
// import { storage } from "./storage";

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
});
