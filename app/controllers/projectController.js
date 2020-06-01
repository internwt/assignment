const db = require("../models");
const Project = db.projects;
const User = db.users;

// Create and Save a new project
exports.create = async (req, res) => {
  console.log(req.body);

  // Save project in the database
  try {
    const result = await Project.create(req.body);
    res.status(201).json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).send({
      error: true,
      message: e.message || "Some error occurred while creating the project.",
    });
  }
};

exports.findAll = async (req, res) => {
  const set = new Set();
  // if assigner's first name and last name was defined, search them against the users table
  const { assignerFirstname = "", assignerLastname = "" } = req.query;
  const score = req.query.score || 0;
  try {
    if (assignerFirstname.length !== "") {
      // search user by first name
      const findUsersByFirstname =
        (await User.findAll({
          where: {
            firstname: assignerFirstname,
          },
        })) || []; // in case no user is found

      // add user id to the set
      findUsersByFirstname.forEach((user) => set.add(user.id));
    }

    if (assignerLastname !== "") {
      //search user by last name
      const findUsersByLastname =
        (await User.findAll({
          where: {
            lastname: assignerLastname,
          },
        })) || [];
      findUsersByLastname.forEach((user) => set.add(user.id));
    }

    // remove the following queries from the request object
    delete req.query.assignerFirstname;
    delete req.query.assignerLastname;
    delete req.query.score;

    const query = req.query;

    // if there are results when searching user by given first and last name
    // add user id to the query body
    if (set.size > 0) query.userId = Array.from(set);

    // search projects by given query, possibly with user id
    const projects =
      (await Project.findAll({
        where: query,
        include: ["tasks"],
      })) || [];

    // creating projects result with average score
    let results = projects.map((project) => {
      let data = project.dataValues;
      let tasks = data.tasks;
      let score = tasks.reduce((acc, cur) => {
        return acc + cur.score;
      }, 0);
      data.averageScore = parseFloat((score / tasks.length || 0).toFixed(2));
      return data;
    });

    res.status(200).json({
      error: false,
      data: results.filter((result) => result.averageScore >= score),
    });
  } catch (e) {
    res.status(500).send({
      error: true,
      message: e.message || "Some error occurred while retreiving projects.",
    });
  }
};

exports.findProjectsById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await Project.findByPk(projectId, {
      include: ["tasks"],
    });
    res.json({
      error: false,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message || "Some error occurred while retreiving projects.",
    });
  }
};
