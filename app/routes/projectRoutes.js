module.exports = (app) => {
  const projects = require("../controllers/projectController");

  let router = require("express").Router();

  // Create a new projects
  router.post("/", projects.create);

  // Retrieve all projects
  router.get("/", projects.findAll);

  // Retrieve project by id
  router.get("/:projectId", projects.findProjectsById);

  app.use("/api/projects", router);
};
