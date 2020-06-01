const db = require("../models");
const Task = db.tasks;

// Create and Save a new project
exports.create = async (req, res) => {
  // Save project in the database
  try {
    const result = await Task.create(req.body);
    res.status(201).json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).send({
      error: true,
      message: e.message || "Some error occurred while creating the task.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Task.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    console.log(result);

    if (result[0] === 1) {
      res.status(201).json({
        error: false,
      });
    } else {
      res.status(500).send({
        error: true,
        message: "Task cannot be updated, check your request body or task id",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: true,
      message: e.message || "Some error occurred while updating the task.",
    });
  }
};

exports.findAll = async (req, res) => {
  const { score = 0 } = req.query;
  delete req.query.score;

  try {
    const results = await Task.findAll({
      where: req.query,
    });
    res.status(200).json({
      error: false,
      data: results.filter((result) => result.score >= score),
    });
  } catch (e) {
    res.status(500).send({
      error: true,
      message: e.message || "Some error occurred while retreiving tasks.",
    });
  }
};
