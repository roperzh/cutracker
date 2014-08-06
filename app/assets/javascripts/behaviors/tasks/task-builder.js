// -------------------------------------------
//   Task builder
// -------------------------------------------

Ui.TaskBuilder = Essential.Behavior.extend({
  init: function() {
    this.model = Cutracker.Models.Task.new();
  },

  events: {
    "click .js-add-task": "addTask"
  },

  addTask: function(e) {
    e.preventDefault();

    var taskList = this.el.getElementsByClassName("tasks-list")[0];
    var taskElement = document.createElement("li");
    var task = this.generateTask();

    /* Set the contents of the task element */
    taskElement.innerHTML = Template.get("tasks/new-task")(task);
    taskList.insertBefore(taskElement, taskList.firstChild);

    setTimeout(function() {
      taskElement.firstChild.classList.remove("minimized");
    });

    Essential.loadBehaviors({
      application: Ui,
      context: taskElement
    });

    this.model.create(task);
  },

  generateTask: function() {
    return {
      name: this.generateRandomName(),
      user_id: SharedData.user.id
    };
  },

  generateRandomName: function() {
    var seed = ["love", "peace", "install"];
    var pickedItem = seed[Math.floor(Math.random()*seed.length)];

    return "Make " + pickedItem + " (click to edit)";
  }
});
