module.exports = (app) => {
  const users = require("../controllers/userController");

  let router = require("express").Router();

  // Create a new users
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve user by id
  router.get("/:userId", users.findUsersById);

  app.use("/api/users", router);
};
