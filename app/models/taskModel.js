module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "task",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Task;
};
