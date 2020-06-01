const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = async (req, res) => {
  console.log(req.body);

  const { email, firstname, lastname } = req.body;

  const user = {
    email,
    firstname,
    lastname,
  };

  // Save user in the database
  try {
    const result = await User.create(user);
    res.status(201).json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message || "Some error occurred while creating the user.",
    });
  }
};

// Retrieve all User from the database or users with given firstname and lastname
exports.findAll = async (req, res) => {
  try {
    const result = await User.findAll({
      where: req.query,
      include: [
        {
          model: db.projects,
          as: "projects",
          include: [
            {
              model: db.tasks,
              as: "tasks",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message || "Some error occurred while retreiving users.",
    });
  }
};

exports.findUsersById = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findByPk(userId, {
      include: ["projects"],
    });
    res.json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message || "Some error occurred while retreiving user.",
    });
  }
};
