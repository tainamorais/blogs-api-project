module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      displayName: { allowNull: false, type: DataTypes.STRING, field: 'display_name' },
      email: { allowNull: false, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
      image: { allowNull: true, type: DataTypes.STRING },
    }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};

/*
Linter não deixa ser display_name, tinha que ser displayName.
*/
