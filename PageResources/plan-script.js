var totalCompleted;
if (localStorage.getItem("total-completed") != null) {
    totalCompleted = JSON.parse(localStorage.getItem("total-completed"));
}
else {
  totalCompleted=0;
  localStorage.setItem("total-completed", JSON.stringify(totalCompleted));
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addPlanItem);
function addPlanItem() {
  taskProgress.tasks++;
  var itemText = planEntryBox.value;
  newPlanItem(itemText, false);
  document.getElementById("plan-form").reset();
}

// var clearButton = document.getElementById("clear-completed-button");
// clearButton.addEventListener("click", clearCompletedPlanItems);


var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);


var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);


var taskProgress=
    {
      tasks: 0,
      completed: 0,
      ratio: 1,
    };

if (localStorage.getItem("progress-items") != null) {
    taskProgress = JSON.parse(localStorage.getItem("progress-items"));
}
localStorage.setItem("progress-ratio", JSON.stringify(taskProgress.ratio));
  localStorage.setItem("progress-items", JSON.stringify(taskProgress));

var planEntryBox = document.getElementById("plan-entry-box");
var planList = document.getElementById("plan-list");


function newPlanItem(itemText, completed) {
  
  var planItem = document.createElement("li");
  var planText = document.createTextNode(itemText);
  var planRemoveButton = document.createElement("button");
  planRemoveButton.classList.add("remove-button", "bg-success", "pretty-button");
  planRemoveButton.appendChild(document.createTextNode("\u2713 "));
  planItem.appendChild(planRemoveButton);
  planItem.appendChild(planText);

  // if (completed) {
  //   taskProgress.completed++;
  //   planItem.classList.add("completed");
  // }

  planList.appendChild(planItem);
  planRemoveButton.parentElement.addEventListener("click", togglePlanItemState);
}

function togglePlanItemState() {
  // if (this.classList.contains("completed")) {
  //   this.classList.remove("completed");
  // } else {
    this.classList.add("completed");
  // }
    taskProgress.completed++;
    totalCompleted++;
    clearCompletedPlanItems();
}

function clearCompletedPlanItems() {
  var completedItems = planList.getElementsByClassName("completed");

  while (completedItems.length > 0) {
    completedItems.item(0).remove(); // so the array is reference? since it directly removes from elements of "completed" class
  }
}

function emptyList() {
  var planItems = planList.children;
  while (planItems.length > 0) {
    planItems.item(0).remove();
  }
  taskProgress={
      tasks: 0,
      completed: 0,
      ratio: 1,
    };
}

function saveList() {
  taskProgress.ratio = taskProgress.completed / taskProgress.tasks;
  var plans = [];

  for (var i = 0; i < planList.children.length; i++) {
    var plan = planList.children.item(i);

    var planInfo = {
      "task": plan.innerText.slice(2), //exclude checkmark and space
      "completed": plan.classList.contains("completed")
    };

    plans.push(planInfo);

  }

  localStorage.setItem("plans", JSON.stringify(plans));
  localStorage.setItem("progress-ratio", JSON.stringify(taskProgress.ratio));
  localStorage.setItem("progress-items", JSON.stringify(taskProgress));
  localStorage.setItem("total-completed", JSON.stringify(totalCompleted));
}

function loadList() {
  if (localStorage.getItem("plans") != null) {
    var plans = JSON.parse(localStorage.getItem("plans"));

    for (var i = 0; i < plans.length; i++) {
      var plan = plans[i];
      newPlanItem(plan.task, plan.completed);
    }
  }
}

loadList();



