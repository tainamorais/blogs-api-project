module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('categories'),
};
