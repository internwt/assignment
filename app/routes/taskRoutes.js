module.exports = (app) => {
  const tasks = require("../controllers/taskController");

  let router = require("express").Router();

  // Create a new task
  router.post("/", tasks.create);

  // Retrieve all tasks
  router.get("/", tasks.findAll);

  // Update task
  router.put("/", tasks.update);

  app.use("/api/tasks", router);
};
