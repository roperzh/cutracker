// -------------------------------------------
//   Task model
// -------------------------------------------

Cutracker.Models.Task = Proto.extend({
  constructor: function(id) {
    this.id = id;
  },

  create: function(taskAttributes) {
    Ajax.post({
      url: "tasks",
      data: {
        task: taskAttributes
      },
      success: function(e) {
        console.log("Task created", e);
      },
      error: function(e) {
        console.log("Error creating task", e);
      }
    });
  },

  update: function(taskAttributes) {
    Ajax.put({
      url: "tasks/" + this.id,
      data: {
        task: taskAttributes
      },
      success: function(e) {
        console.log("Task updated", e);
      },
      error: function(e) {
        console.log("Error updating task", e);
      }
    });
  }
});
