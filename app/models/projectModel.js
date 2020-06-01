module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "project",
    {
      name: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Project;
};
