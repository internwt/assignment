module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
